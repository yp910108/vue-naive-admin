<template>
  <pro-table ref="tableRef" :columns="columns" :data="tableData" />
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { NInputNumber } from 'naive-ui'
import { ProTable, type ProTableColumn } from '@/components'
import type { RowData } from './typings'
import { addressOptions, deptOptions, politicsOptions, sexOptions } from './constants'
import { fetchList } from './service'

const columns = ref<ProTableColumn<RowData>[]>([
  { type: 'selection' },
  { title: '用户姓名', key: 'name' },
  {
    title: '用户性别',
    key: 'sex',
    searchType: 'select',
    searchOptions: sexOptions,
    searchDefaultValue: '2'
  },
  {
    title: '年龄',
    key: 'age',
    renderSearch: (form, key) =>
      h(NInputNumber, {
        value: form[key],
        clearable: true,
        onUpdateValue: (newVal) => (form[key] = newVal)
      }),
    searchDefaultValue: 10
  },
  { title: '出生日期', key: 'birthDate', searchType: 'daterange' },
  { title: '政治面貌', key: 'politics', searchType: 'select', searchOptions: politicsOptions },
  { title: '家庭住址', key: 'address', searchType: 'cascader', searchOptions: addressOptions },
  { title: '所属组织', key: 'dept', searchType: 'tree-select', searchOptions: deptOptions },
  { title: '上级领导', key: 'leader', hideInSearch: true },
  { title: '备注', key: 'remark', hideInSearch: true }
])

const page = ref(1)
const pageSize = ref(10)

const tableData = ref<RowData[]>([])

const fetch = async () => {
  const data = await fetchList({ page: page.value, pageSize: pageSize.value })
  tableData.value = data ?? []
}

onMounted(fetch)
</script>
