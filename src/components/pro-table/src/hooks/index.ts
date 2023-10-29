import { computed, type Ref } from 'vue'
import type { DataTableColumn, DataTableColumnKey } from 'naive-ui'
import type { ProTableColumn } from '../typings'
import { filterSearchColumns, filterSettingColumns, filterTableColumns } from './utils'

export function useColumns(originColumns: Ref<ProTableColumn[]>) {
  const columns = computed(() => {
    return originColumns.value.map((column, i) => {
      const visible = typeof column.initialVisible === 'boolean' ? column.initialVisible : true
      const order = column.initialOrder ?? i
      column.visible = visible
      column.initialVisible = visible
      column.order = order
      column.initialOrder = order
      return column
    })
  })

  const searchColumns = computed(() => filterSearchColumns(columns.value))

  const settingColumns = computed(() => filterSettingColumns(columns.value))

  const tableColumns = computed(() => {
    return filterTableColumns(columns.value).map((column) => {
      const _ellipsis = column.ellipsis
      const ellipsis = typeof _ellipsis === 'boolean' ? _ellipsis : { tooltip: true, ..._ellipsis }
      return { align: 'center', ...column, ellipsis } as DataTableColumn
    })
  })

  const updateColumnsVisible = (keys: DataTableColumnKey[]) => {
    const settingColumnsKey = settingColumns.value.map(({ key }) => key)
    for (const column of columns.value) {
      const key = (column as any).key
      column.visible = !settingColumnsKey.includes(key) || !!keys.includes(key)
    }
  }

  const updateColumnsOrder = (newOrder: number, oldOrder: number) => {
    const currentColumn = columns.value.find(({ order }) => order === oldOrder)
    if (newOrder > oldOrder) {
      for (const column of columns.value) {
        if (column.order! > oldOrder && column.order! <= newOrder) {
          column.order = column.order! - 1
        }
      }
    } else {
      for (const column of columns.value) {
        if (column.order! >= newOrder && column.order! < oldOrder) {
          column.order = column.order! + 1
        }
      }
    }
    currentColumn!.order = newOrder
  }

  const resetColumns = () => {
    for (const column of originColumns.value) {
      column.visible = column.initialVisible
      column.order = column.initialOrder
    }
  }

  return {
    searchColumns,
    settingColumns,
    tableColumns,
    updateColumnsVisible,
    updateColumnsOrder,
    resetColumns
  }
}
