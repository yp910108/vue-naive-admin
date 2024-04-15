import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
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
  NTooltip,
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
import { IconDown, IconArrowRight } from './icons'
import styles from './index.module.scss'

export interface Exposed {
  reload: () => void
  reset: () => void
  setDefaultValue: (key: DataTableColumnKey, value: any) => void
  setDefaultValues: (fields: Record<DataTableColumnKey, any>) => void
  getValue: (key: DataTableColumnKey) => any
  getValues: (keys?: DataTableColumnKey[]) => Record<DataTableColumnKey, any>
  setValue: (key: DataTableColumnKey, value: any) => void
  setValues: (fields: Record<DataTableColumnKey, any>) => void
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
    cols: {
      type: Number as PropType<number>
    },
    labelWidth: {
      type: [String, Number] as PropType<string | number | 'auto'>,
      default: 105
    },
    clearable: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    action: {
      type: [Boolean, Function] as PropType<SearchAction>,
      default: true
    },
    showActionCollapse: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    onSearch: {
      type: Function as PropType<(form: any) => void>
    },
    onReset: {
      type: Function as PropType<() => void>
    }
  },
  setup(props, { expose }) {
    const { form, getForm, setForm, setDefaultForm, resetForm } = useForm(props.columns)

    const collapsed = ref(props.showActionCollapse)

    const collapsedRows = ref(1)

    watch(
      () => props.showActionCollapse,
      (newVal) => (collapsed.value = newVal)
    )

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

    const showTooltips = ref<Record<DataTableColumnKey, boolean>>({})

    const setShowToolTips = (key: DataTableColumnKey, newVal: boolean) => {
      showTooltips.value[key] = newVal
    }

    const renderField = (
      form: Ref<any>,
      { key, renderField, type, clearable, disabled, options }: SearchColumn
    ) => {
      const _clearable = clearable ?? props.clearable
      const _disabled =
        typeof disabled === 'function' ? disabled(form.value) : disabled ?? props.disabled
      const _options: any = typeof options === 'function' ? options() : options
      if (renderField) {
        return renderField(form.value, key, {
          clearable: _clearable,
          disabled: _disabled,
          options: _options
        })
      }
      if (type === 'input') {
        return (
          <NInput
            value={form.value[key]}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateValue={handleUpdateValue.bind(null, key)}
            onKeyup={(e) => e.code === 'Enter' && handleSearch()}
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
        const DatePicker = (
          <NDatePicker
            formattedValue={form.value[key]}
            type={type}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateFormattedValue={handleUpdateValue.bind(null, key)}
            // @ts-ignore
            onMouseenter={setShowToolTips.bind(null, key, true)}
            onMouseleave={setShowToolTips.bind(null, key, false)}
          />
        )
        if (type === 'datetimerange') {
          return (
            <NTooltip show={!!form.value[key] && showTooltips.value[key]}>
              {{
                default: () =>
                  form.value[key] && (
                    <NSpace wrapItem={false} align="center">
                      {form.value[key][0]}
                      <IconArrowRight class="inline" />
                      {form.value[key][1]}
                    </NSpace>
                  ),
                trigger: () => DatePicker
              }}
            </NTooltip>
          )
        } else {
          return DatePicker
        }
      } else {
        return (
          <NInput
            value={form.value[key]}
            clearable={_clearable}
            disabled={_disabled}
            onUpdateValue={handleUpdateValue.bind(null, key)}
            onKeyup={(e) => e.code === 'Enter' && handleSearch()}
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
      const { onReset } = props
      if (onReset) onReset()
      handleSearch()
    }

    const setDefaultValues = (fields: Record<DataTableColumnKey, any>) => {
      for (const key of Object.keys(fields)) {
        setDefaultForm(key, fields[key])
      }
    }

    const getValues = (keys?: DataTableColumnKey[]) => {
      const defaultKeys = Object.keys(form.value)
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

    const exposed: Exposed = {
      reload: handleSearch,
      reset: handleReset,
      setDefaultValue: setDefaultForm,
      setDefaultValues,
      getValue: getForm,
      getValues,
      setValue: setForm,
      setValues
    }

    expose(exposed)

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
            cols={props.cols ?? COLS}
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
            {(props.action || props.showActionCollapse) && (
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
                          {props.showActionCollapse && (overflow || !collapsed.value) ? (
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
                                icon: () => (
                                  <IconDown class={{ 'rotate-180deg': !collapsed.value }} />
                                )
                              }}
                            </NButton>
                          ) : undefined}
                        </NSpace>
                      </NFormItem>
                    )
                  }
                }}
              </NGridItem>
            )}
          </NGrid>
        </NForm>
      </NCard>
    )
  }
})

export default Search as typeof Search & { new (): Exposed }
