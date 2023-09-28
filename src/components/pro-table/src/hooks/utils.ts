import type {
  ProTableColumn,
  ProTableColumnSpecific,
  SearchColumn,
  SettingColumn,
  TableColumn
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
      renderLabel: column.renderSearchLabel,
      renderField: column.renderSearchField
    }
    return result
  })
}

export function filterSettingColumns(columns: ProTableColumn[]) {
  const _columns = columns.filter((column) => !column.type && !column.hideInTable && !column.fixed)
  return _columns.map((column) => {
    const result: SettingColumn = {
      key: (column as any).key,
      label: (column as any).title,
      visible: column.visible,
      order: column.order,
      renderLabel: column.renderSettingLabel
    }
    return result
  })
}

type ProTableColumnSpecificKey = keyof ProTableColumnSpecific
const PROTABLE_COLUMN_SPECIFIC: Record<ProTableColumnSpecificKey, undefined> = {
  searchSpan: undefined,
  searchType: undefined,
  searchOptions: undefined,
  searchDefaultValue: undefined,
  renderSearchLabel: undefined,
  renderSearchField: undefined,
  renderSettingLabel: undefined,
  hideInSearch: undefined,
  hideInTable: undefined
}
const PROTABLE_COLUMN_SPECIFIC_KEYS = Object.keys(
  PROTABLE_COLUMN_SPECIFIC
) as ProTableColumnSpecificKey[]

export function filterTableColumns(columns: ProTableColumn[]): TableColumn[] {
  const _columns = columns.filter((column) => !column.hideInTable && column.visible)
  return _columns
    .map((column) => {
      const _column = { ...column }
      for (const key of PROTABLE_COLUMN_SPECIFIC_KEYS) {
        delete _column[key]
      }
      return _column
    })
    .sort((a, b) => a.order! - b.order!)
}
