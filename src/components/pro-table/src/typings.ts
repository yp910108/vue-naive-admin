import type { VNodeChild } from 'vue'
import type {
  CascaderOption,
  DataTableColumn,
  DataTableColumnKey,
  DataTableProps,
  DatePickerProps,
  SelectOption,
  TreeSelectOption
} from 'naive-ui'

export type RenderSearchParams = {
  onSearch: (params?: any) => void
}
export type ProTableRenderSearchParams = RenderSearchParams

export type RenderSearchActionParams = {
  vnodes: VNodeChild[]
}
export type ProTableRenderSearchActionParams = RenderSearchActionParams

export type RenderActionParams = {
  vnodes: VNodeChild[]
}
export type ProTableRenderActionParams = RenderActionParams

export type RenderContentParams = {
  vnode: VNodeChild
}
export type ProTableRenderContentParams = RenderContentParams

export type DatePickerType = DatePickerProps['type']
type CommonInputColumn = {
  type?: 'input'
  options?: never
  searchType?: 'input'
  searchOptions?: never
}
type CommonInputNumberColumn = {
  type?: 'input-number'
  options?: never
  searchType?: 'input-number'
  searchOptions?: never
}
type CommonSelectColumn = {
  type?: 'select'
  options?: SelectOption[]
  searchType?: 'select'
  searchOptions?: SelectOption[]
}
type CommonTreeSelectColumn = {
  type?: 'tree-select'
  options?: TreeSelectOption[]
  searchType?: 'tree-select'
  searchOptions?: TreeSelectOption[]
}
type CommonCascaderColumn = {
  type?: 'cascader'
  options?: CascaderOption[]
  searchType?: 'cascader'
  searchOptions?: CascaderOption[]
}
type CommonDatePickerColumn = {
  type?: DatePickerType
  options?: never
  searchType?: DatePickerType
  searchOptions?: never
}

type FieldColumn =
  | Pick<CommonInputColumn, 'type' | 'options'>
  | Pick<CommonInputNumberColumn, 'type' | 'options'>
  | Pick<CommonSelectColumn, 'type' | 'options'>
  | Pick<CommonTreeSelectColumn, 'type' | 'options'>
  | Pick<CommonCascaderColumn, 'type' | 'options'>
  | Pick<CommonDatePickerColumn, 'type' | 'options'>
export type SearchColumn = FieldColumn & {
  key: DataTableColumnKey
  label?: string | (() => VNodeChild)
  span?: 1 | 2 | 3 | 4
  defaultValue?: unknown
  renderLabel?: (label?: string) => VNodeChild
  renderField?: (prams: any, key: DataTableColumnKey) => VNodeChild
}

export type SettingColumn = {
  key: DataTableColumnKey
  label?: string | (() => VNodeChild)
  visible?: boolean
  order?: number
  renderLabel?: (label?: string) => VNodeChild
}

export type TableSize = NonNullable<DataTableProps['size']>
export type TablePagination = NonNullable<DataTableProps['pagination']>
export type TableLoading = NonNullable<DataTableProps['loading']>

export type TableExcludeAttrs = 'size' | 'loading' | 'pagination'

export type TableAttrs = Omit<DataTableProps, TableExcludeAttrs>

export type TableColumn<T = Record<string, unknown>> = DataTableColumn<T> & {
  visible?: boolean
  order?: number
}

type SearchFieldColumn =
  | Pick<CommonInputColumn, 'searchType' | 'searchOptions'>
  | Pick<CommonInputNumberColumn, 'searchType' | 'searchOptions'>
  | Pick<CommonSelectColumn, 'searchType' | 'searchOptions'>
  | Pick<CommonTreeSelectColumn, 'searchType' | 'searchOptions'>
  | Pick<CommonCascaderColumn, 'searchType' | 'searchOptions'>
  | Pick<CommonDatePickerColumn, 'searchType' | 'searchOptions'>
export type ProTableColumnSpecific = SearchFieldColumn & {
  searchSpan?: SearchColumn['span']
  searchDefaultValue?: SearchColumn['defaultValue']
  renderSearchLabel?: SearchColumn['renderLabel']
  renderSearchField?: SearchColumn['renderField']
  renderSettingLabel?: SettingColumn['renderLabel']
  hideInSearch?: boolean
  hideInTable?: boolean
}
export type ProTableColumn<T = Record<string, unknown>> = TableColumn<T> & ProTableColumnSpecific
