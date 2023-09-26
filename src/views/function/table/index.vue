<template>
  <pro-table ref="tableRef" :single-line="false" :columns="columns" :request="methodRequest" />
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
    renderSearchField: (form, key) =>
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
  {
    title: '家庭住址',
    key: 'addressId',
    searchType: 'cascader',
    searchOptions: addressOptions,
    hideInTable: true
  },
  { title: '家庭住址', key: 'addressName', hideInSearch: true },
  {
    title: '所属组织',
    key: 'deptId',
    searchType: 'tree-select',
    searchOptions: deptOptions,
    hideInTable: true
  },
  { title: '所属组织', key: 'deptName', hideInSearch: true },
  { title: '上级领导', key: 'leaderName', hideInSearch: true },
  { title: '备注', key: 'remark', hideInSearch: true }
])

const methodRequest = async (params: FetchListParams & { birthDate?: [string, string] }) => {
  if (params.birthDate && params.birthDate.length) {
    params.startBirthDate = params.birthDate[0]
    params.endBirthDate = params.birthDate[1]
    delete params.birthDate
  }
  const { total, list } = (await fetchList(params)) ?? {}
  return { itemCount: total, data: list }
}
</script>
