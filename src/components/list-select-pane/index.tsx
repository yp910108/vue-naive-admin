import { computed, defineComponent, ref, type PropType, type StyleValue } from 'vue'
import { NButton, NModal, type DataTableRowKey, NSpace, type ModalProps } from 'naive-ui'
import ProTable from '../pro-table'

type Row = Record<DataTableRowKey, any>

type Value = Row | Row[] | null

interface Exposed {
  tableRef?: InstanceType<typeof ProTable>
  value: Value
  checked: Value
  show: () => void
  hide: () => void
}

type OnUpdateValue = (newVal: any) => void

const ListSelectPane = defineComponent({
  inheritAttrs: false,
  props: {
    title: {
      type: String as PropType<string>,
      default: '选择'
    },
    modalProps: {
      type: Object as PropType<ModalProps & { style: StyleValue }>
    },
    valueField: {
      type: String as PropType<string>
    },
    labelField: {
      type: String as PropType<string>,
      default: 'name'
    },
    value: {
      type: [Object, Array] as PropType<Value>
    },
    'onUpdate:value': {
      type: [Function, Array] as PropType<OnUpdateValue | OnUpdateValue[]>
    },
    onUpdateValue: {
      type: [Function, Array] as PropType<OnUpdateValue | OnUpdateValue[]>
    },
    confirm: {
      type: Function as PropType<(value: any) => Promise<void>>
    }
  },
  setup(props, { attrs, expose }) {
    const confirmLoading = ref(false)

    const uncontrolledValue = ref<Value>(null)

    const value = computed({
      get: () => {
        return typeof props.value === 'undefined' ? uncontrolledValue.value : props.value
      },
      set: (newVal: Value) => {
        if (typeof props.value === 'undefined') {
          uncontrolledValue.value = newVal
        }
        const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
        if (onUpdateValue) {
          if (typeof onUpdateValue === 'function') {
            onUpdateValue(newVal)
          } else {
            for (const fn of onUpdateValue) {
              fn(newVal)
            }
          }
        }
        if (_onUpdateValue) {
          if (typeof _onUpdateValue === 'function') {
            _onUpdateValue(newVal)
          } else {
            for (const fn of _onUpdateValue) {
              fn(newVal)
            }
          }
        }
      }
    })

    // note: use rowKey(row) instead of props.valueField
    const rowKey = (row?: Row) => {
      type RowKey = ((row?: Row) => DataTableRowKey) | undefined
      const _rowKey = (attrs.rowKey ?? attrs['row-key']) as RowKey
      if (props.valueField) {
        return props.valueField
      } else if (_rowKey) {
        return _rowKey(row)
      } else {
        return 'id'
      }
    }

    const multiple = computed(() => {
      const selectionColumn = (attrs.columns as any).find(({ type }: any) => type === 'selection')
      return !selectionColumn || selectionColumn.multiple || selectionColumn.multiple === undefined
    })

    const checkedRows = ref<Row[]>([])

    const checked = computed({
      get: () => {
        return multiple.value ? checkedRows.value : checkedRows.value[0]
      },
      set: (newChecked) => {
        checkedRows.value = newChecked
          ? Array.isArray(newChecked)
            ? newChecked
            : [newChecked]
          : []
      }
    })

    const handleUpdateCheckedRowKeys = (_keys: DataTableRowKey[], rows: Row[]) => {
      checkedRows.value = rows
    }

    const handleConfirm = async () => {
      if (props.confirm) {
        try {
          confirmLoading.value = true
          await props.confirm(checked.value)
          confirmLoading.value = false
          value.value = checked.value
          hide()
        } catch (e) {
          confirmLoading.value = false
        }
      } else {
        value.value = checked.value
        hide()
      }
    }

    const handleAfterLeave = () => {
      checkedRows.value = []
    }

    const tableRef = ref<InstanceType<typeof ProTable>>()

    const visible = ref(false)

    const show = () => {
      visible.value = true
      tableRef.value?.reset()
      checkedRows.value = (
        (value.value ? (multiple.value ? value.value : [value.value]) : []) as Row[]
      ).filter((row) => !!row[rowKey(row)])
    }

    const hide = () => {
      visible.value = false
    }

    const exposed: Exposed = {
      tableRef: tableRef as unknown as InstanceType<typeof ProTable>,
      value,
      checked,
      show,
      hide
    }

    expose(exposed)

    return () => (
      <NModal
        preset="card"
        title={props.title}
        maskClosable={false}
        style={{ width: '950px', height: '650px' }}
        {...props.modalProps}
        show={visible.value}
        displayDirective="show"
        onUpdateShow={hide}
        onAfterLeave={handleAfterLeave}
      >
        {{
          default: () => (
            <ProTable
              ref={tableRef}
              action={false}
              searchStyle={{ padding: '15px 10px 10px' }}
              contentStyle={{ padding: '0 10px' }}
              {...(attrs as any)}
              rowKey={(row) => row[rowKey(row)]}
              checkedRowKeys={checkedRows.value.map((row) => row[rowKey(row)])}
              onUpdateCheckedRowKeys={handleUpdateCheckedRowKeys}
              rowProps={(row) => {
                const rowProps = (attrs.rowProps ?? attrs['row-props']) as any
                return {
                  ...rowProps?.(row),
                  onClick: (e) => {
                    rowProps?.(row)?.onClick?.(e)
                    const className = (e.target as HTMLDivElement).className
                    if (className.includes('checkbox')) return
                    if (multiple.value) {
                      const index = checkedRows.value.findIndex(
                        (_row) => _row[rowKey(_row)] === row[rowKey(row)]
                      )
                      if (index !== -1) {
                        checkedRows.value.splice(index, 1)
                      } else {
                        checkedRows.value.push(row)
                      }
                    } else {
                      checkedRows.value = [row]
                    }
                  }
                }
              }}
            />
          ),
          footer: () => (
            <NSpace justify="end">
              <NButton onClick={hide}>取 消</NButton>
              <NButton
                type="primary"
                loading={confirmLoading.value}
                disabled={!checkedRows.value.length}
                onClick={handleConfirm}
              >
                {!checkedRows.value.length
                  ? '确 定'
                  : multiple.value
                  ? `确 定（已选${checkedRows.value.length}条）`
                  : `确 定（已选${checkedRows.value[0][props.labelField]}）`}
              </NButton>
            </NSpace>
          )
        }}
      </NModal>
    )
  }
})

export default ListSelectPane as typeof ListSelectPane & typeof ProTable & { new (): Exposed }

export type { Row as ListSelectPaneRow }
