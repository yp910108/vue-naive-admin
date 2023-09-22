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
import Search from './search/index.vue'

interface Props {
  showSearch?: boolean
  columns: TableColumn<any>[]
}

const props = withDefaults(defineProps<Props>(), { showSearch: true })

const searchColumns = computed<SearchColumn[]>(() => filterSearchColumns(props.columns))
</script>
