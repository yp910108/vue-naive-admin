import type { DataTableBaseColumn } from 'naive-ui'
import type { ProTableColumn, SearchColumn, TableColumn } from './typings'

type SearchSpecificKey = Exclude<keyof SearchColumn, 'key' | 'label'>

const SEARCH_SPECIFIC_KEYS: SearchSpecificKey[] = [
  'searchSpan',
  'searchType',
  'searchOptions',
  'searchDefaultValue',
  'renderSearchLabel',
  'renderSearchField'
]

export function filterSearchColumns(columns: ProTableColumn[]) {
  const _columns = columns.filter(
    (column) => !column.type && !column.hideInSearch && typeof column.title === 'string'
  ) as (DataTableBaseColumn & Omit<SearchColumn, 'label'>)[]

  return _columns.map((column) => {
    const result: SearchColumn = { key: column.key, label: column.title as string }
    for (const key of SEARCH_SPECIFIC_KEYS) {
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
    return _column
  })
}
