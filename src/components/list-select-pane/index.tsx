import { computed, defineComponent, ref, type PropType, type Ref } from 'vue'
import { NButton, NModal, type DataTableColumnKey, NSpace, type ModalProps } from 'naive-ui'
import ProTable from '../pro-table'

type Value = Record<string, any> | Record<string, any>[] | null

interface ExposedMethods {
  value: Ref<Value>
  show: () => void
  hide: () => void
}

interface ListSelectExpose {
  new (): ExposedMethods
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
      type: Object as PropType<ModalProps>
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
      type: Function as PropType<(checked: Value) => Promise<void>>
    }
  },
  setup(props, { attrs, expose }) {
    const cachedRows: Record<string, any>[] = []
    const setCachedRows = (rows: Record<string, any>[]) => {
      for (const row of rows) {
        const cachedRow = cachedRows.find((item) => item[rowKey.value] === row[rowKey.value])
        if (!cachedRow) {
          cachedRows.push(row)
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

    const firstCheckedRow = computed(() => {
      const firstKey = checkedRowKeys.value[0]
      return cachedRows.find((row) => row[rowKey.value] === firstKey)
    })

    const handleUpdateCheckedRowKeys = (rowKeys: DataTableColumnKey[]) => {
      checkedRowKeys.value = rowKeys
    }

    const handleConfirm = async () => {
      const checked = multiple.value
        ? cachedRows.filter((row) => checkedRowKeys.value.includes(row[rowKey.value]))
        : firstCheckedRow.value
      if (props.confirm) {
        try {
          confirmLoading.value = true
          await props.confirm(checked!)
          confirmLoading.value = false
          value.value = checked!
          hide()
        } catch (e) {
          confirmLoading.value = false
        }
      } else {
        value.value = checked!
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
      const _value = value.value
      checkedRowKeys.value = _value
        ? multiple.value
          ? _value.map((item: any) => item[rowKey.value])
          : [(_value as Record<string, any>)[rowKey.value]]
        : []
      setCachedRows((_value ? (multiple.value ? _value : [_value]) : []) as Record<string, any>[])
      visible.value = true
    }

    const hide = () => {
      visible.value = false
    }

    const exposedMethods: ExposedMethods = { show, hide, value }

    expose(exposedMethods)

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
              segmented={false}
              action={false}
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
                {multiple.value
                  ? `确 定（已选${checkedRowKeys.value.length}条）`
                  : firstCheckedRow.value
                  ? `确 定（已选${firstCheckedRow.value[props.labelField]}）`
                  : '确 定'}
              </NButton>
            </NSpace>
          )
        }}
      </NModal>
    )
  }
})

export default ListSelectPane as typeof ListSelectPane & typeof ProTable & ListSelectExpose
