import { computed, defineComponent, inject, ref, watch, type PropType } from 'vue'
import { NSelect, type DataTableRowKey, type SelectProps } from 'naive-ui'
import { formItemInjectionKey } from 'naive-ui/es/_mixins/use-form-item'
import type { ProTable } from '../pro-table'
import ListSelectPane, { type ListSelectPaneRow as Row } from '../list-select-pane'

interface Exposed {
  paneRef?: InstanceType<typeof ListSelectPane>
  tableRef?: InstanceType<typeof ProTable>
}

const ListSelect = defineComponent({
  inheritAttrs: false,
  props: {
    selectProps: {
      type: Object as PropType<SelectProps>
    }
  },
  setup(props, { attrs, expose }) {
    const NFormItem = inject(formItemInjectionKey, null)

    const paneRef = ref<InstanceType<typeof ListSelectPane>>()

    const tableRef = computed(() => paneRef.value?.tableRef)

    const multiple = computed(() => {
      const selectionColumn = (attrs.columns as any).find(({ type }: any) => type === 'selection')
      return !selectionColumn || selectionColumn.multiple || selectionColumn.multiple === undefined
    })

    // note: use rowKey(row) instead of attrs.valueField
    const rowKey = (row?: Row) => {
      type RowKey = ((row?: Row) => DataTableRowKey) | undefined
      const _rowKey = (attrs.rowKey ?? attrs['row-key']) as RowKey
      if (attrs.valueField) {
        return attrs.valueField as string
      } else if (_rowKey) {
        return _rowKey(row)
      } else {
        return 'id'
      }
    }

    const labelField = computed(() => {
      const _labelField = (attrs.labelField ?? attrs['label-field']) as string
      return _labelField ?? 'name'
    })

    const selectValue = computed(() => {
      const value = paneRef.value?.value
      if (value) {
        if (Array.isArray(value)) {
          return value.filter((row: Row) => row).map((row: Row) => row[rowKey(row)])
        } else {
          return value[rowKey(value)]
        }
      } else {
        return value
      }
    })

    const selectOptions = computed(() => {
      const _value = paneRef.value?.value
      const value = _value ? (Array.isArray(_value) ? _value : [_value]) : []
      return value.map((item) => ({ value: item[rowKey(item)], label: item[labelField.value] }))
    })

    // clear or multiple clear
    const handleUpdateValue = (newVal: (string[] & number[]) | null) => {
      if (paneRef.value) {
        const _value = paneRef.value.value
        const _newVal = newVal
          ? _value?.filter((item: Row) => newVal.includes(item[rowKey(item)]))
          : newVal
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
      paneRef: paneRef as unknown as InstanceType<typeof ListSelectPane>,
      tableRef: tableRef as unknown as InstanceType<typeof ProTable>
    }

    expose(exposed)

    return () => (
      <>
        <NSelect
          clearable
          {...(props.selectProps as any)}
          valueField="value"
          labelField="label"
          value={selectValue.value}
          multiple={multiple.value}
          max-tag-count="responsive"
          options={selectOptions.value}
          show={false}
          filterable={false}
          onUpdateShow={handleUpdateShow}
          onUpdateValue={handleUpdateValue}
        />
        <ListSelectPane ref={paneRef} {...(attrs as any)} />
      </>
    )
  }
})

export default ListSelect as typeof ListSelect & typeof ListSelectPane & { new (): Exposed }
