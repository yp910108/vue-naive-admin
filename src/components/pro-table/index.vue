<template>
  <n-space vertical class="h-full" :size="16" :wrap-item="false">
    <n-card class="flex-shrink-0 shadow-sm" :bordered="false">
      <search v-if="showSearch && searchColumns.length" :columns="searchColumns" />
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SearchColumn, TableColumn } from './typings'
import { filterSearchColumns } from './utils'
import Search from './search'

interface Props {
  /**
   * 是否显示搜索栏
   */
  showSearch?: boolean
  /**
   * 列、搜索表单配置相关
   * - searchSpan 搜索项占用的列
   * - searchType 搜索项的组件类型
   * - searchOptions 搜索项组件对应的选项内容，当 searchType 为 select、tree-select、cascader 时有效
   * - hideInSearch 列是否在搜索栏中显示
   * - hideInTable 列是否在表格中显示
   */
  columns: TableColumn<any>[]
}

const props = withDefaults(defineProps<Props>(), { showSearch: true })

const searchColumns = computed<SearchColumn[]>(() => filterSearchColumns(props.columns))
</script>
