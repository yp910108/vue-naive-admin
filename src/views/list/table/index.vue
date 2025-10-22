<template>
  <div>
    <pro-table
      ref="tableRef"
      header-title="查询表格"
      :render-toolbar="renderToolbar"
      :columns="columns"
      :request="methodRequest"
      :scroll-x="1200"
    />
    <operate ref="operateRef" @refresh="tableRef?.reload" />
  </div>
</template>

<script setup lang="tsx">
import { ref, h, computed } from 'vue'
import { NButton, NDivider, NGradientText, NInputNumber, NPopconfirm, NTooltip } from 'naive-ui'
import { transformOptionToValueLabel } from '@/utils'
import { useDict } from '@/hooks'
import { ProTable, type ProTableColumn, type ProTableRequestParams } from '@/components'
import type { FetchListParams, Row } from './typings'
import { ADDRESS_OPTIONS, DEPT_OPTIONS } from './constants'
import { fetchList, deleteItem } from './service'
import { IconQuestion } from './icons'
import Operate from './operate.vue'

const tableRef = ref<InstanceType<typeof ProTable>>()

const operateRef = ref<InstanceType<typeof Operate>>()

const renderToolbar = () =>
  h(
    NButton,
    { type: 'primary', onClick: operateRef.value?.show.bind(null, undefined) },
    () => '新 建'
  )

const sexDict = useDict('sex')

const sexValueLabel = computed(() => transformOptionToValueLabel(sexDict.value))

const politicsDict = useDict('politics')

const politicsValueLabel = computed(() => transformOptionToValueLabel(politicsDict.value))

const columns = ref<ProTableColumn<Row>[]>([
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
    fixed: 'left',
    width: 100,
    searchType: 'select',
    searchOptions: () => sexDict.value,
    searchDefaultValue: '1' as Dict.Type['sex'],
    render: (row) => sexValueLabel.value?.[row.sex!]
  },
  {
    key: 'age',
    title: '年龄',
    width: 80,
    renderSearchField: (params, key) => (
      <NInputNumber
        value={params[key]}
        min={1}
        max={100}
        precision={0}
        clearable
        onUpdateValue={(newVal) => (params[key] = newVal)}
      />
    )
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
    searchOptions: () => politicsDict.value,
    render: (row) => politicsValueLabel.value?.[row.politics!],
    renderSettingLabel: (label) => <NGradientText size={14}>{label}</NGradientText>
  },
  {
    key: 'addressId',
    title: '家庭住址',
    searchType: 'cascader',
    searchOptions: ADDRESS_OPTIONS,
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
    searchOptions: DEPT_OPTIONS,
    hideInTable: true
  },
  { key: 'deptName', title: '所属组织', width: 100, hideInSearch: true },
  { key: 'leaderName', title: '上级领导', width: 100, hideInSearch: true },
  { key: 'remark', title: '备注', hideInSearch: true, fixed: 'right' },
  {
    key: 'action',
    title: '操作',
    width: 110,
    fixed: 'right',
    hideInSearch: true,
    render: (row) => [
      <NButton type="primary" text onClick={() => operateRef.value?.show(row)}>
        修改
      </NButton>,
      <NDivider vertical />,
      <NPopconfirm onPositiveClick={() => handleDelete(row)}>
        {{
          default: () => '确认删除该条数据吗？',
          trigger: () => (
            <NButton type="primary" text>
              删除
            </NButton>
          )
        }}
      </NPopconfirm>
    ]
  }
])

const methodRequest = async ({ birthDate, ...rest }: ProTableRequestParams) => {
  const params: FetchListParams = { ...rest }
  if (birthDate?.length) {
    params.startBirthDate = birthDate[0]
    params.endBirthDate = birthDate[1]
  }
  const { total, list } = (await fetchList(params)) ?? {}
  return { itemCount: total, data: list }
}

const handleDelete = async ({ id }: Row) => {
  const instance = window.$message.loading('删除中，请稍后...', { duration: 0 })
  try {
    await deleteItem(id!)
    tableRef.value?.reload()
    setTimeout(() => {
      instance.destroy()
      window.$message.success('删除成功')
    }, 200)
  } catch (e) {
    instance.destroy()
  }
}
</script>
