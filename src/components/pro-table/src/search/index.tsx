import { computed, defineComponent, onMounted, ref, toRef, type PropType, type Ref } from 'vue'
import {
  NButton,
  NCascader,
  NDatePicker,
  NForm,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NTreeSelect,
  NGridItem,
  NFormItem,
  type DataTableColumnKey
} from 'naive-ui'
import { useResizeObserver } from '@vueuse/core'
import type { SearchAction, SearchColumn } from '../typings'
import { COLS, DATE_PICKER_TYPES, SIZE } from './constants'
import { useForm } from './hooks'
import IconDown from './icon-down'
import styles from './index.module.scss'

export interface ExposedMethods {
  reset: () => void
  setSearchValue: (key: DataTableColumnKey, value: any) => void
  setSearchValues: (fields: { [key: DataTableColumnKey]: any }) => void
}

interface SearchExpose {
  new (): ExposedMethods
}

const Search = defineComponent({
  props: {
    columns: {
      type: Array as PropType<SearchColumn[]>,
      required: true
    },
    labelWidth: {
      type: [String, Number] as PropType<string | number | 'auto'>,
      default: 105
    },
    action: {
      type: [Boolean, Function] as PropType<SearchAction>,
      default: true
    },
    onSearch: {
      type: Function as PropType<(form: any) => void>
    }
  },
  setup(props, { expose }) {
    const columns = toRef(props, 'columns')

    const { form, setForm, resetForm } = useForm(columns)

    const collapsed = ref(true)
    const collapsedRows = ref(1)

    const gridRef = ref<InstanceType<typeof NGrid>>()

    const gridEl = computed(() => gridRef.value?.$refs?.contentEl as HTMLDivElement)

    useResizeObserver(gridEl, ([entry]) => {
      const { width } = entry.contentRect
      collapsedRows.value = width <= SIZE.s ? 2 : 1
    })

    const renderField = (form: Ref<any>, { key, renderField, type, options }: SearchColumn) => {
      if (renderField) {
        return renderField(form.value, key)
      }
      if (type === 'input') {
        return (
          <NInput
            value={form.value[key]}
            clearable
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (type === 'input-number') {
        return (
          <NInputNumber
            value={form.value[key]}
            clearable
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (type === 'select') {
        return (
          <NSelect
            value={form.value[key]}
            filterable
            clearable
            options={options}
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (type === 'tree-select') {
        return (
          <NTreeSelect
            value={form.value[key]}
            filterable
            clearable
            default-expand-all
            options={options}
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (type === 'cascader') {
        return (
          <NCascader
            value={form.value[key]}
            filterable
            clearable
            check-strategy="child"
            options={options}
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (DATE_PICKER_TYPES.includes(type)) {
        return (
          <NDatePicker
            formattedValue={form.value[key]}
            type={type}
            clearable
            onUpdateFormattedValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else {
        return (
          <NInput
            value={form.value[key]}
            clearable
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      }
    }

    const handleSearch = () => {
      const { onSearch } = props
      if (onSearch) onSearch(form.value)
    }

    const handleReset = () => {
      resetForm()
      handleSearch()
    }

    const setSearchValues = (fields: { [key: DataTableColumnKey]: any }) => {
      for (const prop of Object.keys(fields)) {
        setForm(prop, fields[prop])
      }
    }

    const exposedMethods: ExposedMethods = {
      reset: handleReset,
      setSearchValue: setForm,
      setSearchValues
    }

    expose(exposedMethods)

    onMounted(handleSearch)

    const renderSearchAction = () => [
      <NButton onClick={handleReset}>{$translate('proTable.searchAction.reset')}</NButton>,
      <NButton type="primary" onClick={handleSearch}>
        {$translate('proTable.searchAction.query')}
      </NButton>
    ]

    return () => (
      <NForm
        model={form}
        labelPlacement="left"
        labelWidth={props.labelWidth}
        showFeedback={false}
        class={styles['pro-table-search']}
      >
        <NGrid
          ref={gridRef}
          xGap={24}
          yGap={20}
          cols={COLS}
          collapsed={collapsed.value}
          collapsedRows={collapsedRows.value}
        >
          {columns.value.map((column) => (
            <NGridItem key={column.key} span={column.span}>
              <NFormItem>
                {{
                  default: () => renderField(form, column),
                  label: () =>
                    typeof column.label === 'function'
                      ? column.label()
                      : column.renderLabel
                      ? column.renderLabel(column.label)
                      : column.label
                }}
              </NFormItem>
            </NGridItem>
          ))}
          <NGridItem suffix span={1} class="pro-table-search__action">
            {{
              default: ({ overflow }: { overflow: boolean }) => {
                return (
                  <NFormItem>
                    <NSpace wrapItem={false}>
                      {props.action
                        ? typeof props.action === 'function'
                          ? props.action({ vnodes: renderSearchAction() })
                          : renderSearchAction()
                        : undefined}
                      {overflow || !collapsed.value ? (
                        <NButton
                          type="primary"
                          text
                          icon-placement="right"
                          onClick={() => (collapsed.value = !collapsed.value)}
                        >
                          {{
                            default: () =>
                              collapsed.value
                                ? $translate('proTable.searchAction.expand')
                                : $translate('proTable.searchAction.collapse'),
                            icon: () => <IconDown class={{ 'rotate-180deg': !collapsed.value }} />
                          }}
                        </NButton>
                      ) : undefined}
                    </NSpace>
                  </NFormItem>
                )
              }
            }}
          </NGridItem>
        </NGrid>
      </NForm>
    )
  }
})

export default Search as typeof Search & SearchExpose
