<template>
  <n-space vertical class="h-full" :size="16" :wrap-item="false">
    <n-card class="flex-shrink-0 shadow-sm" :bordered="false">
      <n-form :model="form" label-placement="left" :label-width="105" :show-feedback="false">
        <n-grid :x-gap="24" :y-gap="20">
          <n-form-item-gi label="规则名称" :span="8">
            <n-input v-model:value="form.ruleName" clearable />
          </n-form-item-gi>
          <n-form-item-gi label="描述" :span="8">
            <n-input v-model:value="form.desc" clearable />
          </n-form-item-gi>
          <n-form-item-gi label="服务调用次数" :span="8">
            <n-input-number v-model:value="form.num" clearable />
          </n-form-item-gi>
          <n-form-item-gi label="状态" :span="8">
            <n-select v-model:value="form.status" clearable :options="generalOptions" />
          </n-form-item-gi>
          <n-form-item-gi label="上次调度时间" :span="8">
            <n-date-picker
              v-model:formatted-value="form.lastTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
            />
          </n-form-item-gi>
          <n-form-item-gi class="action" :span="8">
            <n-space>
              <n-button>重 置</n-button>
              <n-button type="primary">查 询</n-button>
              <n-button type="primary" text icon-placement="right">
                收起
                <template #icon>
                  <icon-down class="rotate-180deg" />
                </template>
              </n-button>
            </n-space>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-card>
    <n-card
      class="flex-1 h-0 shadow-sm"
      :content-style="{ display: 'flex', flexDirection: 'column', height: 0 }"
      :bordered="false"
    >
      <n-space
        justify="space-between"
        class="flex-shrink-0 items-center"
        :size="20"
        :wrap-item="false"
      >
        <n-h4 class="m-0">查询表格</n-h4>
        <n-space class="items-center" :wrap-item="false">
          <n-button type="primary">新 建</n-button>
          <icon-refresh class="font-size-18px cursor-pointer" />
          <icon-column-height class="font-size-18px cursor-pointer" />
          <icon-setting class="font-size-18px cursor-pointer" />
        </n-space>
      </n-space>
      <n-data-table
        flex-height
        class="flex-1 mt-16px h-0"
        :bordered="false"
        :row-key="(row) => row.address"
        :columns="columns"
        :data="data"
        :pagination="{
          pageSlot: 7,
          pageSize: 20,
          prefix: ({ startIndex, endIndex, itemCount }) =>
            `第 ${startIndex + 1}-${endIndex + 1} 条/总共 ${itemCount} 条`,
          showSizePicker: true,
          pageSizes: [10, 20, 50, 100]
        }"
      />
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import IconDown from './icon-down.vue'
import IconRefresh from './icon-refresh.vue'
import IconColumnHeight from './icon-column-height.vue'
import IconSetting from './icon-setting.vue'

const form = ref({
  ruleName: '',
  desc: '',
  num: null,
  lastTime: null,
  status: null
})

const generalOptions = ['groode', 'veli good', 'emazing', 'lidiculous'].map((v) => ({
  label: v,
  value: v
}))

type RowData = {
  key: number
  name: string
  age: string
  address: string
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    type: 'selection',
    disabled(row) {
      return row.name === 'Edward King 3'
    }
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]

const columns = createColumns()

const data = Array.from({ length: 100 }).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))
</script>

<style scoped lang="scss">
.n-grid {
  .n-form-item {
    .n-form-item-blank {
      .n-date-picker,
      .n-input-number {
        width: 100%;
      }
    }
  }
  :deep(.action) {
    .n-form-item {
      .n-form-item-blank {
        justify-content: flex-end;
      }
    }
  }
}
</style>
