<template>
  <pro-table
    ref="tableRef"
    :columns="columns"
    :request="methodRequest"
    :scroll-x="1200"
    :render-search-options="renderSearchOptions"
  />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NButton, NDivider, NGradientText, NInputNumber, NTooltip } from 'naive-ui'
import { ProTable, type ProTableColumn, type RenderProTableSearchOptionsParams } from '@/components'
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
    key: 'name',
    title: '用户姓名',
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
    key: 'sex',
    title: '用户性别',
    width: 100,
    searchType: 'select',
    searchOptions: sexOptions,
    searchDefaultValue: '1',
    render: (row) => SEX[row.sex]
  },
  {
    key: 'age',
    title: '年龄',
    width: 80,
    renderSearchField: (params, key) =>
      h(NInputNumber, {
        value: params[key],
        clearable: true,
        min: 1,
        max: 100,
        precision: 0,
        onUpdateValue: (newVal) => (params[key] = newVal)
      })
  },
  {
    key: 'birthDate',
    title: '出生日期',
    width: 120,
    searchType: 'daterange'
  },
  {
    key: 'politics',
    title: '政治面貌',
    width: 100,
    searchType: 'select',
    searchOptions: politicsOptions,
    render: (row) => POLITICS[row.politics],
    renderSettingLabel: (label) => h(NGradientText, { size: 14 }, { default: () => label })
  },
  {
    key: 'addressId',
    title: '家庭住址',
    searchType: 'cascader',
    searchOptions: addressOptions,
    hideInTable: true
  },
  {
    key: 'addressName',
    title: '家庭住址',
    width: 140,
    hideInSearch: true
  },
  {
    key: 'deptId',
    title: '所属组织',
    searchType: 'tree-select',
    searchOptions: deptOptions,
    hideInTable: true
  },
  { key: 'deptName', title: '所属组织', width: 100, hideInSearch: true },
  { key: 'leaderName', title: '上级领导', width: 100, hideInSearch: true },
  { key: 'remark', title: '备注', hideInSearch: true },
  {
    key: 'action',
    title: '操作',
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
  console.log(params)
  if (params.birthDate && params.birthDate.length) {
    params.startBirthDate = params.birthDate[0]
    params.endBirthDate = params.birthDate[1]
    delete params.birthDate
  }
  const { total, list } = (await fetchList(params)) ?? {}
  return { itemCount: total, data: list }
}

const renderSearchOptions = ({ vnodes }: RenderProTableSearchOptionsParams) => {
  return [
    vnodes.reverse(),
    h(
      NButton,
      {
        onClick: () => {
          console.log('导出...')
        }
      },
      { default: () => '导出' }
    )
  ]
}
</script>
