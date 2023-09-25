<template>
  <pro-table ref="tableRef" :columns="columns" :data="[]" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NInputNumber } from 'naive-ui'
import { ProTable, type ProTableColumn } from '@/components'
import type { Politics, Sex } from './typings'
import { addressOptions, deptOptions, politicsOptions, sexOptions } from './constants'
import { fetchList } from './service'

type RowData = {
  id: string
  label: string
  sex: Sex
  age: number
  birthDate: string
  politics: Politics
  address: string
  dept: string
  leader: string
  remark: string
}

const columns = ref<ProTableColumn<RowData>[]>([
  { type: 'selection' },
  { title: '用户姓名', key: 'label' },
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

fetchList({}).then((res) => {
  console.log(res)
})
</script>
