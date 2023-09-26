<template>
  <pro-table
    ref="tableRef"
    :columns="columns"
    :pagination="{
      page: 1,
      pageSize: 30,
      pageSizes: [10, 20, 30, 50, 100]
    }"
    :request="methodRequest"
  />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NInputNumber } from 'naive-ui'
import { ProTable, type ProTableColumn } from '@/components'
import type { FetchListParams, RowData } from './typings'
import {
  sex,
  addressOptions,
  deptOptions,
  politicsOptions,
  sexOptions,
  politics
} from './constants'
import { fetchList } from './service'

const columns = ref<ProTableColumn<RowData>[]>([
  { type: 'selection' },
  { title: '用户姓名', key: 'name' },
  {
    title: '用户性别',
    key: 'sex',
    searchType: 'select',
    searchOptions: sexOptions,
    searchDefaultValue: '1',
    render: (row) => sex[row.sex]
  },
  {
    title: '年龄',
    key: 'age',
    renderSearch: (form, key) =>
      h(NInputNumber, {
        value: form[key],
        clearable: true,
        min: 1,
        max: 100,
        precision: 0,
        onUpdateValue: (newVal) => (form[key] = newVal)
      })
  },
  { title: '出生日期', key: 'birthDate', searchType: 'daterange' },
  {
    title: '政治面貌',
    key: 'politics',
    searchType: 'select',
    searchOptions: politicsOptions,
    render: (row) => politics[row.politics]
  },
  { title: '家庭住址', key: 'addressName', searchType: 'cascader', searchOptions: addressOptions },
  { title: '所属组织', key: 'deptName', searchType: 'tree-select', searchOptions: deptOptions },
  { title: '上级领导', key: 'leaderName', hideInSearch: true },
  { title: '备注', key: 'remark', hideInSearch: true }
])

const methodRequest = async (params: FetchListParams) => {
  const { total, list } = (await fetchList(params)) ?? {}
  return { itemCount: total, data: list }
}
</script>
