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

export type DatePickerType = DatePickerProps['type']

type InputColumn = {
  searchType?: 'input'
  searchOptions?: never
}
type InputNumberColumn = {
  searchType?: 'input-number'
  searchOptions?: never
}
type SelectColumn = {
  searchType?: 'select'
  searchOptions?: SelectOption[]
}
type TreeSelectColumn = {
  searchType?: 'tree-select'
  searchOptions?: TreeSelectOption[]
}
type CascaderColumn = {
  searchType?: 'cascader'
  searchOptions?: CascaderOption[]
}
type DatePickerColumn = {
  searchType?: DatePickerType
  searchOptions?: never
}

type FieldColumn =
  | InputColumn
  | InputNumberColumn
  | SelectColumn
  | TreeSelectColumn
  | CascaderColumn
  | DatePickerColumn

export type SearchExcludeKey = 'key' | 'title'

export type SearchColumn = FieldColumn & {
  key: DataTableColumnKey
  title?: string | ((column: SearchColumn) => VNodeChild)
  searchSpan?: 1 | 2 | 3 | 4
  searchDefaultValue?: unknown
  renderSearchLabel?: (label?: string) => VNodeChild
  renderSearchField?: (prams: any, key: DataTableColumnKey) => VNodeChild
}

export type SettingExcludeKey = 'key' | 'title'

export type SettingColumn = {
  key: DataTableColumnKey
  title?: string | ((column: SettingColumn) => VNodeChild)
  renderSettingLabel?: (label?: string) => VNodeChild
}

export type TableColumn<T = Record<string, unknown>> = DataTableColumn<T>

export type ProTableColumn<T = Record<string, unknown>> = TableColumn<T> &
  Omit<SearchColumn, SearchExcludeKey> &
  Omit<SettingColumn, SettingExcludeKey> & {
    hideInSearch?: boolean
    hideInTable?: boolean
  }

export type TableSize = NonNullable<DataTableProps['size']>
export type TablePagination = NonNullable<DataTableProps['pagination']>
export type TableLoading = NonNullable<DataTableProps['loading']>

export type TableExcludeAttrs = {
  size: TableSize
  pagination: TablePagination
  loading: TableLoading
}

export type TableAttrs = Omit<DataTableProps, keyof TableExcludeAttrs>
