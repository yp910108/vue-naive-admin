import { computed, ref, type Ref } from 'vue'
import type { DataTableColumnKey } from 'naive-ui'
import type { ProTableColumn, TableColumn } from '../typings'
import { filterSearchColumns, filterSettingColumns, filterTableColumns } from './utils'

export function useColumns(originColumns: Ref<ProTableColumn[]>) {
  const getColumns = (columns: ProTableColumn[]) => {
    return columns.map((column, i) => {
      column.visible = true
      column.order = i
      return column
    })
  }
  const columns = ref(getColumns(originColumns.value))

  const searchColumns = computed(() => filterSearchColumns(columns.value))

  const settingColumns = computed(() => filterSettingColumns(columns.value))

  const tableColumns = computed(() => {
    return filterTableColumns(columns.value).map((column) => {
      const _ellipsis = column.ellipsis
      const ellipsis = typeof _ellipsis === 'boolean' ? _ellipsis : { tooltip: true, ..._ellipsis }
      return { align: 'center', ...column, ellipsis } as TableColumn
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
    columns.value = getColumns(originColumns.value)
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
