import { computed, type Ref } from 'vue'
import type { DataTableColumn, DataTableColumnKey } from 'naive-ui'
import type { ProTableColumn } from '../typings'
import { filterSearchColumns, filterSettingColumns, filterTableColumns } from './utils'

export function useColumns(originColumns: Ref<ProTableColumn[]>) {
  const columns = computed(() => {
    return originColumns.value.map((column, i) => {
      const visible = typeof column.visible === 'boolean' ? column.visible : true
      const order = column.order ?? i
      const fixed = column.fixed
      column.visible = visible
      column._visible = visible
      column.fixed = fixed
      column._fixed = fixed
      column.order = order
      column._order = order
      return column
    })
  })

  const searchColumns = computed(() => filterSearchColumns(columns.value))

  const settingColumns = computed(() => filterSettingColumns(columns.value))

  const tableColumns = computed(() => {
    return filterTableColumns(columns.value).map((column) => {
      const _ellipsis = column.ellipsis
      const ellipsis = typeof _ellipsis === 'boolean' ? _ellipsis : { tooltip: true, ..._ellipsis }
      const _column: DataTableColumn = { align: 'center', ...column, ellipsis }
      if (ellipsis && typeof ellipsis === 'object') {
        _column.ellipsisComponent = 'performant-ellipsis'
      }
      return _column
    })
  })

  const updateColumnsVisible = (keys: DataTableColumnKey[]) => {
    const settingColumnsKey = settingColumns.value.map(({ key }) => key)
    for (const column of columns.value) {
      const key = (column as any).key
      column._visible = !settingColumnsKey.includes(key) || !!keys.includes(key)
    }
  }

  const updateColumnsFixed = (key: DataTableColumnKey, fixed: ProTableColumn['fixed']) => {
    const column = columns.value.find(
      (column) => !column.hideInTable && (column as any).key === key
    )
    column && (column._fixed = fixed)
  }

  const updateColumnsOrder = (newOrder: number, oldOrder: number) => {
    const currentColumn = columns.value.find(({ _order }) => _order === oldOrder)
    if (newOrder > oldOrder) {
      for (const column of columns.value) {
        if (column._order! > oldOrder && column._order! <= newOrder) {
          column._order = column._order! - 1
        }
      }
    } else {
      for (const column of columns.value) {
        if (column._order! >= newOrder && column._order! < oldOrder) {
          column._order = column._order! + 1
        }
      }
    }
    currentColumn!._order = newOrder
  }

  const resetColumns = () => {
    for (const column of originColumns.value) {
      column._visible = column.visible
      column._fixed = column.fixed
      column._order = column.order
    }
  }

  return {
    searchColumns,
    settingColumns,
    tableColumns,
    updateColumnsVisible,
    updateColumnsFixed,
    updateColumnsOrder,
    resetColumns
  }
}
