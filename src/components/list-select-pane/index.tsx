import { computed, defineComponent, ref, type PropType, type StyleValue } from 'vue'
import { NButton, NModal, type DataTableColumnKey, NSpace, type ModalProps } from 'naive-ui'
import ProTable from '../pro-table'

type Value = Record<string, any> | Record<string, any>[] | null

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
      type: Function as PropType<(checked: any) => Promise<void>>
    }
  },
  setup(props, { attrs, expose }) {
    const cachedRows = ref<Record<DataTableColumnKey, any>[]>([])

    const setCachedRows = (rows: Record<DataTableColumnKey, any>[]) => {
      for (const row of rows) {
        const cachedRow = cachedRows.value.find((item) => item[rowKey.value] === row[rowKey.value])
        if (!cachedRow) {
          cachedRows.value.push(row)
        }
      }
    }

    const confirmLoading = ref(false)

    const uncontrolledValue = ref<Value>(null)

    const value = computed({
      get() {
        return typeof props.value === 'undefined' ? uncontrolledValue.value : props.value
      },
      set(newVal: Value) {
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

    // note: use rowKey instead of props.valueField
    const rowKey = computed(() => {
      if (props.valueField) {
        return props.valueField
      } else if (attrs.rowKey) {
        return (attrs.rowKey as () => DataTableColumnKey)()
      } else {
        return 'id'
      }
    })

    const multiple = computed(() => {
      const selectionColumn = (attrs.columns as any).find(({ type }: any) => type === 'selection')
      return !selectionColumn || selectionColumn.multiple || selectionColumn.multiple === undefined
    })

    const checkedRowKeys = ref<DataTableColumnKey[]>([])

    const checked = computed(() => {
      const _checked = cachedRows.value.filter((row) =>
        checkedRowKeys.value.includes(row[rowKey.value])
      )
      return multiple.value ? _checked : _checked[0]
    })

    const handleUpdateCheckedRowKeys = (rowKeys: DataTableColumnKey[]) => {
      checkedRowKeys.value = rowKeys
    }

    const handleConfirm = async () => {
      if (props.confirm) {
        try {
          confirmLoading.value = true
          await props.confirm(checked.value!)
          confirmLoading.value = false
          value.value = checked.value!
          hide()
        } catch (e) {
          confirmLoading.value = false
        }
      } else {
        value.value = checked.value!
        hide()
      }
    }

    const handleAfterLeave = () => {
      checkedRowKeys.value = []
    }

    const tableRef = ref<InstanceType<typeof ProTable>>()

    const visible = ref(false)

    const show = () => {
      tableRef.value?.reset()
      const _value = (
        (value.value ? (multiple.value ? value.value : [value.value]) : []) as Record<string, any>[]
      ).filter((item) => !!item[rowKey.value])
      checkedRowKeys.value = _value.map((item) => item[rowKey.value])
      setCachedRows(_value)
      visible.value = true
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
              rowKey={(row) => row[rowKey.value]}
              checkedRowKeys={checkedRowKeys.value}
              onUpdateCheckedRowKeys={handleUpdateCheckedRowKeys}
              onAfterRequest={setCachedRows}
            />
          ),
          footer: () => (
            <NSpace justify="end">
              <NButton onClick={hide}>取 消</NButton>
              <NButton
                type="primary"
                loading={confirmLoading.value}
                disabled={!Object.keys(checkedRowKeys.value).length}
                onClick={handleConfirm}
              >
                {(multiple.value && !checkedRowKeys.value.length) || !checked.value
                  ? '确 定'
                  : multiple.value
                  ? `确 定（已选${checkedRowKeys.value.length}条）`
                  : `确 定（已选${checked.value[props.labelField as any]}）`}
              </NButton>
            </NSpace>
          )
        }}
      </NModal>
    )
  }
})

export default ListSelectPane as typeof ListSelectPane & typeof ProTable & { new (): Exposed }
