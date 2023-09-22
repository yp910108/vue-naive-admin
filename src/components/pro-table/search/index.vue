<template>
  <n-form :model="form" label-placement="left" :label-width="105" :show-feedback="false">
    <n-grid
      ref="gridRef"
      :cols="COLS"
      :x-gap="24"
      :y-gap="20"
      :collapsed="collapsed"
      :collapsed-rows="collapsedRows"
    >
      <n-form-item-gi v-for="column of columns" :key="column.key" :label="column.title" :span="1">
        <n-input v-if="column.searchType === 'input'" v-model:value="form[column.key]" clearable />
        <n-input-number
          v-else-if="column.searchType === 'input-number'"
          v-model:value="form[column.key]"
          clearable
        />
        <n-select
          v-else-if="column.searchType === 'select'"
          v-model:value="form[column.key]"
          filterable
          clearable
          :options="column.searchOptions"
        />
        <n-tree-select
          v-else-if="column.searchType === 'tree-select'"
          v-model:value="form[column.key]"
          filterable
          clearable
          default-expand-all
          :options="column.searchOptions"
        />
        <n-cascader
          v-else-if="column.searchType === 'cascader'"
          v-model:value="form[column.key]"
          filterable
          clearable
          check-strategy="child"
          :options="column.searchOptions"
        />
        <n-date-picker
          v-else-if="DATE_PICKER_TYPES.includes(column.searchType)"
          v-model:value="form[column.key]"
          clearable
          :type="column.searchType"
        />
        <n-input v-else v-model:value="form[column.key]" clearable />
      </n-form-item-gi>
      <n-form-item-gi suffix class="pro-table-search__action" :span="1">
        <n-space>
          <n-button>重 置</n-button>
          <n-button type="primary">查 询</n-button>
          <n-button type="primary" text icon-placement="right" @click="collapsed = !collapsed">
            {{ collapsed ? '展开' : '收起' }}
            <template #icon>
              <icon-down :class="{ 'rotate-180deg': !collapsed }" />
            </template>
          </n-button>
        </n-space>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NGrid } from 'naive-ui'
import { useResizeObserver } from '@vueuse/core'
import type { SearchColumn } from '../typing'
import { SIZE, COLS, DATE_PICKER_TYPES } from './constant'
import IconDown from './icon-down.vue'

interface Props {
  columns: SearchColumn[]
}

defineProps<Props>()

const form = ref<any>({})

const collapsed = ref(true)
const collapsedRows = ref(1)

const gridRef = ref<InstanceType<typeof NGrid>>()

const gridEl = computed(() => gridRef.value?.$refs?.contentEl as HTMLDivElement)

useResizeObserver(gridEl, ([entry]) => {
  const { width } = entry.contentRect
  collapsedRows.value = width <= SIZE.s ? 2 : 1
})
</script>

<style scoped lang="scss">
.n-date-picker,
.n-input-number {
  width: 100%;
}
:deep(.pro-table-search__action) {
  .n-form-item {
    .n-form-item-blank {
      justify-content: flex-end;
    }
  }
}
</style>
