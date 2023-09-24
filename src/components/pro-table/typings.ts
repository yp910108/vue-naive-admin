import type { VNodeChild } from 'vue'
import type {
  CascaderOption,
  DataTableBaseColumn,
  DataTableColumn,
  DataTableColumnKey,
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
type CommonColumn = (
  | InputColumn
  | InputNumberColumn
  | SelectColumn
  | TreeSelectColumn
  | CascaderColumn
  | DatePickerColumn
) & {
  searchSpan?: 1 | 2 | 3 | 4
  searchDefaultValue?: unknown
  renderSearch?: (form: any, key: DataTableColumnKey) => VNodeChild
}

export type TableColumn<T = unknown> = DataTableColumn<T> &
  CommonColumn & {
    hideInSearch?: boolean
    hideInTable?: boolean
  }

export type SearchColumn = Omit<DataTableBaseColumn, 'title'> & CommonColumn & { title?: string }

export type ProTableColumn<T = unknown> = TableColumn<T>
