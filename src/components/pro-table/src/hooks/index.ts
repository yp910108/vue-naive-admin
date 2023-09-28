import { computed, type Ref } from 'vue'
import type { ProTableColumn, TableColumn } from '../typings'
import { filterSearchColumns, filterSettingColumns, filterTableColumns } from './utils'

export function useColumns(columns: Ref<ProTableColumn[]>) {
  const searchColumns = computed(() => filterSearchColumns(columns.value))

  const settingColumns = computed(() => filterSettingColumns(columns.value))

  const tableColumns = computed(() => {
    return filterTableColumns(columns.value).map((column) => {
      const _ellipsis = column.ellipsis
      const ellipsis = typeof _ellipsis === 'boolean' ? _ellipsis : { tooltip: true, ..._ellipsis }
      return { align: 'center', ...column, ellipsis } as TableColumn
    })
  })

  return { searchColumns, settingColumns, tableColumns }
}
