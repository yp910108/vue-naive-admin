<template>
  <div class="h-full overflow-hidden">
    <n-card title="表格" :bordered="false" class="h-full rounded-8px shadow-sm">
      <n-space vertical>
        <n-space>
          <n-button @click="getDataSource">有数据</n-button>
          <n-button @click="getEmptyDataSource">空数据</n-button>
        </n-space>
        <loading-empty class="h-480px" :loading="loading" :empty="empty">
          <n-data-table :columns="columns" :data="dataSource" flex-height class="h-480px" />
        </loading-empty>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue'
import { NSpace, NButton, NPopconfirm, type DataTableColumn } from 'naive-ui'
import { getRandomInteger } from './helper'

interface DataSource {
  name: string
  age: number
  address: string
}

// const { loading, startLoading, endLoading, empty, setEmpty } = useLoadingEmpty()
const loading = ref(false)
const empty = ref(false)

const columns: DataTableColumn[] = [
  {
    title: 'Name',
    key: 'name',
    align: 'center'
  },
  {
    title: 'Age',
    key: 'age',
    align: 'center'
  },
  {
    title: 'Address',
    key: 'address',
    align: 'center'
  },
  {
    key: 'action',
    title: 'Action',
    align: 'center',
    render: () => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => {}}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => {}}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      )
    }
  }
]

const dataSource = ref<DataSource[]>([])

function createDataSource(): DataSource[] {
  return Array(100)
    .fill(1)
    .map((_item, index) => {
      return {
        name: `Name${index}`,
        age: getRandomInteger(30, 20),
        address: '中国'
      }
    })
}

function getDataSource() {
  loading.value = true
  setTimeout(() => {
    dataSource.value = createDataSource()
    loading.value = false
    empty.value = !dataSource.value.length
  }, 1000)
}

function getEmptyDataSource() {
  loading.value = true
  setTimeout(() => {
    dataSource.value = []
    loading.value = false
    empty.value = !dataSource.value.length
  }, 1000)
}

onMounted(() => {
  getDataSource()
})
</script>
