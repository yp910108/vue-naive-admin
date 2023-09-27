import { defineComponent, toRef, type PropType, ref, computed, type Ref, onMounted } from 'vue'
import {
  NButton,
  NCascader,
  NDatePicker,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NTreeSelect,
  type DataTableColumnKey
} from 'naive-ui'
import { useResizeObserver } from '@vueuse/core'
import type { SearchColumn } from '../typings'
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

    const renderField = (
      form: Ref<any>,
      { key, renderSearchField, searchType, searchOptions }: SearchColumn
    ) => {
      if (renderSearchField) {
        return renderSearchField(form.value, key)
      }
      if (searchType === 'input') {
        return (
          <NInput
            value={form.value[key]}
            clearable
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (searchType === 'input-number') {
        return (
          <NInputNumber
            value={form.value[key]}
            clearable
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (searchType === 'select') {
        return (
          <NSelect
            value={form.value[key]}
            filterable
            clearable
            options={searchOptions}
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (searchType === 'tree-select') {
        return (
          <NTreeSelect
            value={form.value[key]}
            filterable
            clearable
            default-expand-all
            options={searchOptions}
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (searchType === 'cascader') {
        return (
          <NCascader
            value={form.value[key]}
            filterable
            clearable
            check-strategy="child"
            options={searchOptions}
            onUpdateValue={(newVal) => (form.value[key] = newVal)}
          />
        )
      } else if (DATE_PICKER_TYPES.includes(searchType)) {
        return (
          <NDatePicker
            formattedValue={form.value[key]}
            type={searchType}
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

    return () => (
      <NForm
        model={form}
        labelPlacement="left"
        labelWidth={105}
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
            <NFormItemGi key={column.key} span={column.searchSpan}>
              {{
                default: () => renderField(form, column),
                label: () =>
                  column.renderSearchLabel ? column.renderSearchLabel(column.label) : column.label
              }}
            </NFormItemGi>
          ))}
          <NFormItemGi suffix span={1} class="pro-table-search__action">
            <NSpace wrapItem={false}>
              <NButton onClick={handleReset}>重 置</NButton>
              <NButton type="primary" onClick={handleSearch}>
                查 询
              </NButton>
              <NButton
                type="primary"
                text
                icon-placement="right"
                onClick={() => (collapsed.value = !collapsed.value)}
              >
                {{
                  default: () => (collapsed.value ? '展开' : '收起'),
                  icon: () => <IconDown class={{ 'rotate-180deg': !collapsed.value }} />
                }}
              </NButton>
            </NSpace>
          </NFormItemGi>
        </NGrid>
      </NForm>
    )
  }
})

export default Search as typeof Search & SearchExpose