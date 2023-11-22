import {
  computed,
  defineComponent,
  onMounted,
  ref,
  type CSSProperties,
  type PropType,
  type Ref
} from 'vue'
import {
  NButton,
  NCard,
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
import { removeInvalidValues } from '@/utils'
import type { SearchAction, SearchColumn } from '../typings'
import { COLS, DATE_PICKER_TYPES, SIZE } from './constants'
import { useForm } from './hooks'
import IconDown from './icon-down'
import styles from './index.module.scss'

export interface ExposedMethods {
  reload: () => void
  reset: () => void
  setDefaultValue: (key: DataTableColumnKey, value: any) => void
  setDefaultValues: (fields: Record<DataTableColumnKey, any>) => void
  getValue: (key: DataTableColumnKey) => any
  getValues: (keys?: DataTableColumnKey[]) => Record<DataTableColumnKey, any>
  setValue: (key: DataTableColumnKey, value: any) => void
  setValues: (fields: Record<DataTableColumnKey, any>) => void
}

interface SearchExpose {
  new (): ExposedMethods
}

const Search = defineComponent({
  props: {
    contentStyle: {
      type: [String, Object] as PropType<CSSProperties>
    },
    columns: {
      type: Array as PropType<SearchColumn[]>,
      required: true
    },
    labelWidth: {
      type: [String, Number] as PropType<string | number | 'auto'>,
      default: 105
    },
    clearable: {
      type: Boolean as PropType<boolean>,
      default: true
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
    const { form, getForm, setForm, setDefaultForm, resetForm } = useForm(props.columns)

    const collapsed = ref(true)
    const collapsedRows = ref(1)

    const gridRef = ref<InstanceType<typeof NGrid>>()

    const gridEl = computed(() => gridRef.value?.$refs?.contentEl as HTMLDivElement)

    useResizeObserver(gridEl, ([entry]) => {
      const { width } = entry.contentRect
      collapsedRows.value = width <= SIZE.s ? 2 : 1
    })

    const handleUpdateValue = (key: DataTableColumnKey, newVal: any) => {
      const oldVal = form.value[key]
      form.value[key] = newVal
      const column = props.columns.find((column) => column.key === key)
      if (column?.onChange) {
        const { onChange } = column
        if (typeof onChange === 'function') {
          onChange(newVal, oldVal)
        } else {
          const { watch, handler } = onChange
          if (!watch) handler(newVal, oldVal)
        }
      }
    }

    const renderField = (
      form: Ref<any>,
      { key, renderField, type, clearable, disabled, options }: SearchColumn
    ) => {
      if (renderField) {
        return renderField(form.value, key)
      }
      const _clearable = clearable ?? props.clearable
      const _disabled = typeof disabled === 'function' ? disabled(form.value) : disabled
      const _options: any = typeof options === 'function' ? options() : options
      if (type === 'input') {
        return (
          <NInput
            value={form.value[key]}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateValue={handleUpdateValue.bind(null, key)}
          />
        )
      } else if (type === 'input-number') {
        return (
          <NInputNumber
            value={form.value[key]}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateValue={handleUpdateValue.bind(null, key)}
          />
        )
      } else if (type === 'select' || type === 'multiple-select') {
        return (
          <NSelect
            value={form.value[key]}
            multiple={type === 'multiple-select'}
            max-tag-count="responsive"
            filterable
            clearable={_clearable}
            disabled={_disabled}
            options={_options}
            onUpdateValue={handleUpdateValue.bind(null, key)}
          />
        )
      } else if (type === 'tree-select') {
        return (
          <NTreeSelect
            value={form.value[key]}
            filterable
            clearable={_clearable}
            disabled={_disabled}
            default-expand-all
            options={_options}
            onUpdateValue={handleUpdateValue.bind(null, key)}
          />
        )
      } else if (type === 'cascader') {
        return (
          <NCascader
            value={form.value[key]}
            filterable
            clearable={_clearable}
            disabled={_disabled}
            check-strategy="child"
            options={_options}
            onUpdateValue={handleUpdateValue.bind(null, key)}
          />
        )
      } else if (DATE_PICKER_TYPES.includes(type)) {
        return (
          <NDatePicker
            formattedValue={form.value[key]}
            type={type}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateFormattedValue={handleUpdateValue.bind(null, key)}
          />
        )
      } else {
        return (
          <NInput
            value={form.value[key]}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateValue={handleUpdateValue.bind(null, key)}
          />
        )
      }
    }

    const handleSearch = () => {
      const { onSearch } = props
      if (onSearch) onSearch(removeInvalidValues(form.value))
    }

    const handleReset = () => {
      resetForm()
      handleSearch()
    }

    const setDefaultValues = (fields: Record<DataTableColumnKey, any>) => {
      for (const key of Object.keys(fields)) {
        setDefaultForm(key, fields[key])
      }
    }

    const getValues = (keys?: DataTableColumnKey[]) => {
      const defaultKeys = props.columns.map(({ key }) => key)
      const result: Record<DataTableColumnKey, any> = {}
      for (const key of keys ?? defaultKeys) {
        result[key] = getForm(key)
      }
      return removeInvalidValues(result) ?? {}
    }

    const setValues = (fields: Record<DataTableColumnKey, any>) => {
      for (const key of Object.keys(fields)) {
        setForm(key, fields[key])
      }
    }

    const exposedMethods: ExposedMethods = {
      reload: handleSearch,
      reset: handleReset,
      setDefaultValue: setDefaultForm,
      setDefaultValues,
      getValue: getForm,
      getValues,
      setValue: setForm,
      setValues
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
      <NCard bordered={false} contentStyle={{ ...props.contentStyle }}>
        <NForm
          labelPlacement="left"
          labelWidth={props.labelWidth}
          showFeedback={false}
          class={styles['pro-table-search']}
        >
          <NGrid
            ref={gridRef}
            cols={COLS}
            collapsed={collapsed.value}
            collapsedRows={collapsedRows.value}
            xGap={24}
            yGap={20}
          >
            {props.columns.map((column) => (
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
      </NCard>
    )
  }
})

export default Search as typeof Search & SearchExpose
