<template>
  <list-select
    title="选择人员"
    label-field="realName"
    :search="{ showActionCollapse: false, labelWidth: 70, cols: 3 }"
    :columns="columns"
    :request="methodRequest"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProTableColumn, ProTableRequestParams } from '../pro-table'
import ListSelect from '../list-select'
import type { Row } from './typings'
import { fetchList } from './service'

interface Props {
  multiple?: boolean
}

const props = defineProps<Props>()

const columns = ref<ProTableColumn<Row>[]>([
  { type: 'selection', multiple: props.multiple },
  {
    key: 'username',
    title: '工号'
  },
  {
    key: 'realName',
    title: '姓名'
  },
  {
    key: 'orgName',
    title: '部门/车间',
    hideInSearch: true
  }
])

const methodRequest = async (params: ProTableRequestParams) => {
  const { total, records } = (await fetchList(params)) ?? {}
  const data = records?.map((item) => {
    const orgIds = item.orgId?.split(',')
    const orgNames = item.orgNames?.split(',')
    return {
      ...item,
      orgId: orgIds?.[0],
      orgName: orgNames?.[0]
    }
  })
  return { itemCount: total, data }
}
</script>
