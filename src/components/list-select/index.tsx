import { computed, defineComponent, inject, ref, watch, type PropType } from 'vue'
import { NSelect, type DataTableColumnKey, type SelectProps } from 'naive-ui'
import { formItemInjectionKey } from 'naive-ui/es/_mixins/use-form-item'
import ListSelectPane from '../list-select-pane'

interface Exposed {
  paneRef?: InstanceType<typeof ListSelectPane>
}

const ListSelect = defineComponent({
  inheritAttrs: false,
  props: {
    selectProps: {
      type: Object as PropType<SelectProps>
    },
    valueField: {
      type: String as PropType<string>
    },
    labelField: {
      type: String as PropType<string>,
      default: 'name'
    }
  },
  setup(props, { attrs, expose }) {
    const NFormItem = inject(formItemInjectionKey, null)

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
          return _value.map((item: any) => item[rowKey.value]).filter((item: any) => item)
        } else {
          return (_value as Record<string, any>)[rowKey.value] || null
        }
      } else {
        return null
      }
    })

    // clear or multiple clear
    const handleUpdateValue = (newVal: (string[] & number[]) | null) => {
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

    const exposed: Exposed = {
      paneRef: paneRef as unknown as InstanceType<typeof ListSelectPane>
    }

    expose(exposed)

    return () => (
      <>
        <NSelect
          labelField={props.labelField}
          valueField={rowKey.value}
          clearable
          {...(props.selectProps as any)}
          value={value.value}
          multiple={multiple.value}
          max-tag-count="responsive"
          options={options.value}
          show={false}
          onUpdateShow={handleUpdateShow}
          onUpdateValue={handleUpdateValue}
        />
        <ListSelectPane
          ref={paneRef}
          {...(attrs as any)}
          valueField={rowKey.value}
          labelField={props.labelField}
        />
      </>
    )
  }
})

export default ListSelect as typeof ListSelect & typeof ListSelectPane & { new (): Exposed }
