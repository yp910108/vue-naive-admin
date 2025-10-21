<template>
  <list-select
    title="选择人员"
    :modal-props="{
      class: 'w-1050px! h-700px!'
    }"
    :search="{ showActionCollapse: false, labelWidth: 80, cols: 3 }"
    :columns="columns"
    :request="methodRequest"
  />
</template>

<script setup lang="tsx">
import { computed, ref } from 'vue'
import { NInputNumber } from 'naive-ui'
import { transformOptionToValueLabel } from '@/utils'
import { useDict } from '@/hooks'
import type { ProTableColumn, ProTableRequestParams } from '../pro-table'
import ListSelect from '../list-select'
import type { FetchListParams, Row } from './typings'
import { fetchList } from './service'

interface Props {
  multiple?: boolean
}

const props = defineProps<Props>()

const sexDict = useDict('sex')

const sexValueLabel = computed(() => transformOptionToValueLabel(sexDict.value))

const columns = ref<ProTableColumn<Row>[]>([
  { type: 'selection', multiple: props.multiple },
  {
    key: 'name',
    title: '用户姓名',
    width: 100
  },
  {
    key: 'sex',
    title: '用户性别',
    width: 100,
    searchType: 'select',
    searchOptions: () => sexDict.value,
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
  }
])

const methodRequest = async ({ birthDate, page, pageSize, ...rest }: ProTableRequestParams) => {
  const params: FetchListParams = { ...rest, page: page, pageSize: pageSize }
  if (birthDate.length) {
    params.startBirthDate = birthDate[0]
    params.endBirthDate = birthDate[1]
  }
  const { total, list } = (await fetchList(params)) ?? {}
  return { itemCount: total, data: list }
}
</script>
