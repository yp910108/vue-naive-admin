import { computed, defineComponent, inject, ref, watch, type PropType } from 'vue'
import { NSelect, type DataTableColumnKey } from 'naive-ui'
import { formItemInjectionKey } from 'naive-ui/es/_mixins/use-form-item'
import ListSelectPane from '../../list-select-pane'
import type { SelectAttrs } from './typings'
import { selectExcludeAttrsKeys } from './constants'

type Value = any | any[] | null

const ListSelect = defineComponent({
  inheritAttrs: false,
  props: {
    selectProps: {
      type: Object as PropType<SelectAttrs>
    },
    valueField: {
      type: String as PropType<string>
    },
    labelField: {
      type: String as PropType<string>,
      default: 'name'
    }
  },
  setup(props, { attrs }) {
    const NFormItem = inject(formItemInjectionKey, null)

    const restSelectAttrs = computed(() => {
      const result: Record<string, any> = {}
      const selectAttrs = props.selectProps as Record<string, any>
      if (selectAttrs) {
        for (const key of Object.keys(selectAttrs)) {
          if (!selectExcludeAttrsKeys.includes(key)) {
            result[key] = selectAttrs[key]
          }
        }
      }
      return result
    })

    const paneRef = ref<InstanceType<typeof ListSelectPane>>()

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

    const options = computed(() => {
      const _value = paneRef.value?.value
      return _value ? (multiple.value ? _value : [_value]) : []
    })

    const value = computed(() => {
      const _value = paneRef.value?.value
      if (_value) {
        if (multiple.value) {
          return _value.map((item: any) => item[rowKey.value])
        } else {
          return _value[rowKey.value]
        }
      } else {
        return null
      }
    })

    const handleUpdateValue = (newVal: Value) => {
      const _attrs = attrs as any
      const _value = _attrs.value
      const _newVal = newVal
        ? _value?.filter((item: any) => newVal.includes(item[rowKey.value]))
        : newVal
      if (paneRef.value) {
        paneRef.value.value = _newVal
      }
    }

    const handleUpdateShow = (show: boolean) => {
      if (show) {
        paneRef.value?.show()
      }
    }

    watch(
      () => attrs.value,
      () => {
        NFormItem?.handleContentChange()
      }
    )

    return () => (
      <>
        <NSelect
          value={value.value}
          multiple={multiple.value}
          labelField={props.labelField}
          valueField={rowKey.value}
          options={options.value}
          clearable
          show={false}
          onUpdateShow={handleUpdateShow}
          onUpdateValue={handleUpdateValue}
          {...(restSelectAttrs as any)}
        />
        <ListSelectPane ref={paneRef} {...(attrs as any)} />
      </>
    )
  }
})

export default ListSelect as typeof ListSelect & typeof ListSelectPane
