import { computed, defineComponent, ref, type PropType, type Ref } from 'vue'
import { NButton, NModal, type DataTableColumnKey, NSpace } from 'naive-ui'
import ProTable from '../../pro-table'
import { modalExcludeAttrsKeys, proTableExcludeAttrsKeys } from './constants'
import type { ModalAttrs } from './typings'

type Value = any | any[] | null

interface ExposedMethods {
  value: Ref<Value>
  show: () => void
  hide: () => void
}

interface ListSelectExpose {
  new (): ExposedMethods
}

type OnUpdateValue = (newVal: Value) => void

const ListSelectPane = defineComponent({
  inheritAttrs: false,
  props: {
    title: {
      type: String as PropType<string>,
      default: '选择'
    },
    modalProps: {
      type: Object as PropType<ModalAttrs>
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
      type: Function as PropType<OnUpdateValue>
    },
    onUpdateValue: {
      type: Function as PropType<OnUpdateValue>
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
          cachedRows.push({
            [rowKey.value]: row[rowKey.value],
            [props.labelField]: row[props.labelField]
          })
        }
      }
    }

    const restAttrs = computed(() => {
      const result: Record<string, any> = {}
      for (const key of Object.keys(attrs)) {
        if (!proTableExcludeAttrsKeys.includes(key)) {
          result[key] = attrs[key]
        }
      }
      return result
    })

    const restModalAttrs = computed(() => {
      const result: Record<string, unknown> = {}
      const modalAttrs = props.modalProps as Record<string, any>
      if (modalAttrs) {
        for (const key of Object.keys(modalAttrs)) {
          if (!modalExcludeAttrsKeys.includes(key)) {
            result[key] = modalAttrs[key]
          }
        }
      }
      return result
    })

    const confirmLoading = ref(false)

    const uncontrolledValue = ref<Value>()

    const value = computed({
      get() {
        return typeof props.value === 'undefined' ? uncontrolledValue.value : props.value
      },
      set(newVal: Value) {
        if (typeof props.value === 'undefined') {
          uncontrolledValue.value = newVal
        } else {
          const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
          if (onUpdateValue) onUpdateValue(newVal)
          if (_onUpdateValue) _onUpdateValue(newVal)
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
          await props.confirm(checked)
          confirmLoading.value = false
          value.value = checked
          hide()
        } catch (e) {
          confirmLoading.value = false
        }
      } else {
        value.value = checked
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
          : [_value[rowKey.value]]
        : []
      setCachedRows(_value ? (multiple.value ? _value : [_value]) : [])
      visible.value = true
    }

    const hide = () => {
      visible.value = false
    }

    const exposedMethods: ExposedMethods = { show, hide, value }

    expose(exposedMethods)

    return () => (
      <NModal
        show={visible.value}
        displayDirective="show"
        preset="card"
        title={props.title}
        maskClosable={false}
        style={{ width: '950px', height: '650px' }}
        onUpdateShow={hide}
        onAfterLeave={handleAfterLeave}
        {...restModalAttrs}
      >
        {{
          default: () => (
            <ProTable
              ref={tableRef}
              segmented={false}
              action={false}
              rowKey={(row) => row[rowKey.value]}
              checkedRowKeys={checkedRowKeys.value}
              onUpdateCheckedRowKeys={handleUpdateCheckedRowKeys}
              onAfterRequest={setCachedRows}
              {...(restAttrs.value as any)}
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
