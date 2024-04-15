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

export type RenderSearchActionParams = {
  vnodes: VNodeChild[]
}

export type SearchAction = boolean | ((actionParams: RenderSearchActionParams) => VNodeChild)

export type RenderActionParams = {
  vnodes: VNodeChild[]
}

export type RenderContentParams = {
  vnode: VNodeChild
}

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
  type?: 'select' | 'multiple-select'
  options?: SelectOption[] | (() => SelectOption[] | undefined)
  searchType?: 'select' | 'multiple-select'
  searchOptions?: SelectOption[] | (() => SelectOption[] | undefined)
}
type CommonTreeSelectColumn = {
  type?: 'tree-select'
  options?: TreeSelectOption[] | (() => TreeSelectOption[] | undefined)
  searchType?: 'tree-select'
  searchOptions?: TreeSelectOption[] | (() => TreeSelectOption[] | undefined)
}
type CommonCascaderColumn = {
  type?: 'cascader'
  options?: CascaderOption[] | (() => CascaderOption[] | undefined)
  searchType?: 'cascader'
  searchOptions?: CascaderOption[] | (() => CascaderOption[] | undefined)
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
type OnSearchChange = (newValue: any, oldValue: any) => void
export type SearchColumn = FieldColumn & {
  key: DataTableColumnKey
  label?: string | (() => VNodeChild)
  span?: 1 | 2 | 3 | 4
  defaultValue?: unknown
  clearable?: boolean
  disabled?: boolean | ((params: any) => boolean)
  onChange?: OnSearchChange | { watch?: boolean; immediate?: boolean; handler: OnSearchChange }
  renderLabel?: (label?: string) => VNodeChild
  renderField?: (
    params: any,
    key: DataTableColumnKey,
    info: {
      clearable: boolean
      disabled: boolean
      options: any
    }
  ) => VNodeChild
}

export type SettingColumn = {
  key: DataTableColumnKey
  label?: string | (() => VNodeChild)
  visible?: boolean
  fixed?: DataTableColumn['fixed']
  order?: number
  initialOrder?: number
  renderLabel?: (label?: string) => VNodeChild
}

export type TableSize = NonNullable<DataTableProps['size']>
export type TablePagination = NonNullable<DataTableProps['pagination']>
export type TableLoading = NonNullable<DataTableProps['loading']>

export type TableExcludeAttrs = 'size' | 'loading' | 'pagination'

export type TableAttrs = Omit<DataTableProps, TableExcludeAttrs>

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
  searchClearable?: SearchColumn['clearable']
  searchDisabled?: SearchColumn['disabled']
  onSearchChange?: SearchColumn['onChange']
  renderSearchLabel?: SearchColumn['renderLabel']
  renderSearchField?: SearchColumn['renderField']
  renderSettingLabel?: SettingColumn['renderLabel']
  hideInSearch?: boolean
  hideInTable?: boolean
  visible?: SettingColumn['visible']
  _visible?: SettingColumn['visible']
  fixed?: SettingColumn['fixed']
  _fixed?: SettingColumn['fixed']
  order?: SettingColumn['order']
  _order?: SettingColumn['order']
}
export type ProTableColumn<T = Record<string, unknown>> = DataTableColumn<T> &
  ProTableColumnSpecific

export type RequestParams = Record<DataTableColumnKey, any> & {
  page?: number
  pageSize?: number
}
