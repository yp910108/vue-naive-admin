import type { DataTableColumn } from 'naive-ui'
import type {
  ProTableColumn,
  ProTableColumnSpecific,
  SearchColumn,
  SettingColumn
} from '../typings'

export function filterSearchColumns(columns: ProTableColumn[]) {
  const _columns = columns.filter((column) => !column.type && !column.hideInSearch)
  return _columns.map((column) => {
    const result: SearchColumn = {
      key: (column as any).key,
      label: (column as any).title,
      span: column.searchSpan,
      type: column.searchType as any,
      options: column.searchOptions,
      defaultValue: column.searchDefaultValue,
      clearable: column.searchClearable,
      disabled: column.searchDisabled,
      onChange: column.onSearchChange,
      renderLabel: column.renderSearchLabel,
      renderField: column.renderSearchField
    }
    return result
  })
}

export function filterSettingColumns(columns: ProTableColumn[]) {
  const _columns = columns.filter((column) => !column.type && !column.hideInTable)
  return _columns
    .map((column) => {
      const result: SettingColumn = {
        key: (column as any).key,
        label: (column as any).title,
        visible: column._visible,
        fixed: column._fixed,
        order: column._order,
        renderLabel: column.renderSettingLabel
      }
      return result
    })
    .sort((a, b) => a.order! - b.order!)
}

type ProTableColumnSpecificKey = keyof ProTableColumnSpecific
const PROTABLE_COLUMN_SPECIFIC: Record<ProTableColumnSpecificKey, undefined> = {
  searchSpan: undefined,
  searchType: undefined,
  searchOptions: undefined,
  searchDefaultValue: undefined,
  searchClearable: undefined,
  searchDisabled: undefined,
  onSearchChange: undefined,
  renderSearchLabel: undefined,
  renderSearchField: undefined,
  renderSettingLabel: undefined,
  hideInSearch: undefined,
  hideInTable: undefined,
  visible: undefined,
  _visible: undefined,
  fixed: undefined,
  _fixed: undefined,
  order: undefined,
  _order: undefined
}
const PROTABLE_COLUMN_SPECIFIC_KEYS = Object.keys(
  PROTABLE_COLUMN_SPECIFIC
) as ProTableColumnSpecificKey[]

export function filterTableColumns(columns: ProTableColumn[]): DataTableColumn[] {
  const _columns = columns.filter((column) => !column.hideInTable && column._visible)
  return _columns
    .map((column) => {
      const _column = { ...column }
      for (const key of PROTABLE_COLUMN_SPECIFIC_KEYS) {
        delete _column[key]
      }
      _column.visible = column._visible
      _column.fixed = column._fixed
      _column.order = column._order
      return _column
    })
    .sort((a, b) => a.order! - b.order!)
}
