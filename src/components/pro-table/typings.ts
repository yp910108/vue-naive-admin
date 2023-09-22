import type {
  CascaderOption,
  DataTableBaseColumn,
  DataTableColumn,
  DatePickerProps,
  SelectOption,
  TreeSelectOption
} from 'naive-ui'

export type DatePickerType = DatePickerProps['type']

type ColumnInput = {
  searchType?: 'input'
  searchOptions?: never
}
type ColumnInputNumber = {
  searchType?: 'input-number'
  searchOptions?: never
}
type ColumnSelect = {
  searchType?: 'select'
  searchOptions?: SelectOption[]
}
type ColumnTreeSelect = {
  searchType?: 'tree-select'
  searchOptions?: TreeSelectOption[]
}
type ColumnCascader = {
  searchType?: 'cascader'
  searchOptions?: CascaderOption[]
}
type ColumnDatePicker = {
  searchType?: DatePickerType
  searchOptions?: never
}
type CommonColumn =
  | ColumnInput
  | ColumnInputNumber
  | ColumnSelect
  | ColumnTreeSelect
  | ColumnCascader
  | ColumnDatePicker

export type TableColumn<T = unknown> = DataTableColumn<T> &
  CommonColumn & {
    hideInSearch?: boolean
    hideInTable?: boolean
  }

export type SearchColumn = Omit<DataTableBaseColumn, 'title'> & CommonColumn & { title?: string }

export type ProTableColumn<T = unknown> = TableColumn<T>
