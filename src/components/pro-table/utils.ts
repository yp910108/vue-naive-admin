import type { SearchColumn, TableColumn } from './typings'

export function filterSearchColumns(columns: TableColumn[]) {
  const _columns = columns.filter((column) => {
    return !column.type && !column.hideInSearch && typeof column.title === 'string'
  })
  return _columns.map((column) => {
    const _column = { ...column }
    delete _column.hideInSearch
    delete _column.hideInTable
    return _column
  }) as SearchColumn[]
}
