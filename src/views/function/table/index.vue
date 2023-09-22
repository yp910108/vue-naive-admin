<template>
  <pro-table :columns="columns" />
</template>

<script setup lang="ts">
import type { CascaderOption, TreeSelectOption } from 'naive-ui'
import { transformObjectToOption } from '@/utils'
import { ProTable, type ProTableColumn } from '@/components'

type Sex = '1' | '2'

type Politics = '1' | '2' | '3'

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

const SEX: Record<Sex, string> = {
  '1': '男',
  '2': '女'
}
const sexOptions = transformObjectToOption(SEX)

const politics: Record<Politics, string> = {
  '1': '党员',
  '2': '团员',
  '3': '群众'
}
const politicsOptions = transformObjectToOption(politics)

const addressOptions: CascaderOption[] = [
  {
    value: '10001',
    label: '山东省',
    children: [
      {
        value: '1000101',
        label: '济南市',
        children: [
          {
            value: '100010101',
            label: '高新区'
          },
          {
            value: '100010102',
            label: '历城区'
          }
        ]
      }
    ]
  },
  {
    value: '10002',
    label: '北京市',
    children: [
      {
        value: '1000201',
        label: '东城区'
      },
      {
        value: '1000202',
        label: '西城区'
      }
    ]
  }
]

const deptOptions: TreeSelectOption[] = [
  {
    key: '10001',
    label: '开发部',
    children: [
      {
        key: '1000101',
        label: '开发一部'
      },
      {
        key: '1000102',
        label: '开发二部'
      },
      {
        key: '1000103',
        label: '开发三部'
      },
      {
        key: '1000104',
        label: '开发四部'
      },
      {
        key: '1000105',
        label: '开发五部'
      }
    ]
  },
  {
    key: '10002',
    label: '人力资源部',
    children: [
      {
        key: '1000201',
        label: '人力资源部一部'
      },
      {
        key: '1000202',
        label: '人力资源部二部'
      },
      {
        key: '1000203',
        label: '人力资源部三部'
      }
    ]
  }
]

const columns: ProTableColumn<RowData>[] = [
  { type: 'selection' },
  { title: '用户姓名', key: 'label' },
  { title: '用户性别', key: 'sex', searchType: 'select', searchOptions: sexOptions },
  { title: '年龄', key: 'age', searchType: 'input-number' },
  { title: '出生日期', key: 'birthDate', searchType: 'daterange' },
  { title: '政治面貌', key: 'politics', searchType: 'select', searchOptions: politicsOptions },
  { title: '家庭住址', key: 'address', searchType: 'cascader', searchOptions: addressOptions },
  { title: '所属组织', key: 'dept', searchType: 'tree-select', searchOptions: deptOptions },
  { title: '上级领导', key: 'leader', hideInSearch: true },
  { title: '备注', key: 'remark', hideInSearch: true }
]
</script>
