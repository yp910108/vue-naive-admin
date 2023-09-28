<template>
  <pro-table
    ref="tableRef"
    :single-line="false"
    :columns="columns"
    :request="methodRequest"
    :scroll-x="1200"
  />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NButton, NDivider, NInputNumber, NTooltip } from 'naive-ui'
import { ProTable, type ProTableColumn } from '@/components'
import type { FetchListParams, RowData } from './typings'
import {
  SEX,
  addressOptions,
  deptOptions,
  politicsOptions,
  sexOptions,
  POLITICS
} from './constants'
import { fetchList } from './service'
import IconQuestion from './icon-question.vue'

const columns = ref<ProTableColumn<RowData>[]>([
  { type: 'selection', fixed: 'left' },
  {
    title: '用户姓名',
    key: 'name',
    width: 100,
    fixed: 'left',
    renderSearchLabel: (label) => [
      label,
      h(NTooltip, null, {
        default: () => `${label}是唯一的 key`,
        trigger: () =>
          h(IconQuestion, {
            class: 'inline-block vertical-top ml-3px mt-1px font-size-16px color-#999 cursor-help'
          })
      })
    ]
  },
  {
    title: '用户性别',
    key: 'sex',
    width: 100,
    searchType: 'select',
    searchOptions: sexOptions,
    searchDefaultValue: '1',
    render: (row) => SEX[row.sex]
  },
  {
    title: '年龄',
    key: 'age',
    width: 80,
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
  { title: '出生日期', key: 'birthDate', width: 120, searchType: 'daterange' },
  {
    title: '政治面貌',
    key: 'politics',
    width: 100,
    searchType: 'select',
    searchOptions: politicsOptions,
    render: (row) => POLITICS[row.politics]
  },
  {
    title: '家庭住址',
    key: 'addressId',
    searchType: 'cascader',
    searchOptions: addressOptions,
    hideInTable: true
  },
  { title: '家庭住址', key: 'addressName', width: 140, hideInSearch: true },
  {
    title: '所属组织',
    key: 'deptId',
    searchType: 'tree-select',
    searchOptions: deptOptions,
    hideInTable: true
  },
  { title: '所属组织', key: 'deptName', width: 100, hideInSearch: true },
  { title: '上级领导', key: 'leaderName', width: 100, hideInSearch: true },
  { title: '备注', key: 'remark', hideInSearch: true },
  {
    title: '操作',
    key: 'action',
    width: 110,
    fixed: 'right',
    render: () => [
      h(NButton, { type: 'primary', text: true }, { default: () => '修改' }),
      h(NDivider, { vertical: true }),
      h(NButton, { type: 'primary', text: true }, { default: () => '删除' })
    ]
  }
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
