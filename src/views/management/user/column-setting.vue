<template>
  <n-popover placement="bottom" trigger="click">
    <template #trigger>
      <n-button size="small" type="primary">
        <icon-setting-outlined class="mr-4px text-16px" />
        表格列设置
      </n-button>
    </template>
    <div class="w-180px">
      <template v-for="item of list">
        <div
          v-if="item.key"
          :key="item.key"
          class="flex-y-center h-36px px-12px hover:bg-primary_active"
        >
          <icon-drag class="mr-8px text-20px cursor-move" />
          <n-checkbox v-model:checked="item.checked">
            {{ item.title }}
          </n-checkbox>
        </div>
      </template>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DataTableColumn } from 'naive-ui'
// import VueDraggable from 'vuedraggable'
import type { Row } from './typing'

type Column = DataTableColumn<Row>

interface Props {
  columns: Column[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:columns', columns: Column[]): void
}

const emit = defineEmits<Emits>()

type List = Column & { checked?: boolean } & { key: string } & { title: string }

const list = ref(initList())

function initList() {
  return props.columns.map((item) => ({ ...item, checked: true })) as List[]
}

watch(
  list,
  (newValue) => {
    const newColumns = newValue.filter((item) => item.checked)

    const columns: Column[] = newColumns.map((item) => {
      const column = { ...item }
      delete column.checked

      return column
    }) as Column[]

    emit('update:columns', columns)
  },
  { deep: true }
)
</script>

<style scoped></style>
