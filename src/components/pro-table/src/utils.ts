import type { DataTableBaseColumn } from 'naive-ui'
import type { ProTableColumn, SearchColumn, SettingColumn, TableColumn } from './typings'

type SearchSpecificKey = Exclude<keyof SearchColumn, 'key' | 'label'>
const SEARCH_SPECIFIC_KEY: Record<SearchSpecificKey, undefined> = {
  searchSpan: undefined,
  searchType: undefined,
  searchOptions: undefined,
  searchDefaultValue: undefined,
  renderSearchLabel: undefined,
  renderSearchField: undefined
}
const SEARCH_SPECIFIC_KEYS = Object.keys(SEARCH_SPECIFIC_KEY) as SearchSpecificKey[]
export function filterSearchColumns(columns: ProTableColumn[]) {
  const _columns = columns.filter(
    (column) => !column.type && !column.hideInSearch
  ) as (DataTableBaseColumn & Omit<SearchColumn, 'label'>)[]

  return _columns.map((column) => {
    const result: SearchColumn = { key: column.key, label: column.title }
    for (const key of SEARCH_SPECIFIC_KEYS) {
      result[key] = column[key] as any
    }
    return result
  })
}

type SettingSpecificKey = Exclude<keyof SettingColumn, 'key' | 'label'>
const SETTING_SPECIFIC_KEY: Record<SettingSpecificKey, undefined> = {
  renderSettingLabel: undefined
}
const SETTING_SPECIFIC_KEYS = Object.keys(SETTING_SPECIFIC_KEY) as SettingSpecificKey[]
export function filterSettingColumns(columns: ProTableColumn[]) {
  const _columns = columns.filter(
    (column) => !column.type && !column.hideInTable && !column.fixed
  ) as (DataTableBaseColumn & Omit<SettingColumn, 'label'>)[]

  return _columns.map((column) => {
    const result: SettingColumn = { key: column.key, label: column.title }
    for (const key of SETTING_SPECIFIC_KEYS) {
      result[key] = column[key] as any
    }
    return result
  })
}

export function filterTableColumns(columns: ProTableColumn[]): TableColumn[] {
  const _columns = columns.filter((column) => !column.hideInTable)
  return _columns.map((column) => {
    const _column = { ...column }
    delete _column.hideInSearch
    delete _column.hideInTable
    for (const key of SEARCH_SPECIFIC_KEYS) {
      delete _column[key]
    }
    for (const key of SETTING_SPECIFIC_KEYS) {
      delete _column[key]
    }
    return _column
  })
}
