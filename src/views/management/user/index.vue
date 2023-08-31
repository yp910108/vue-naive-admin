<template>
  <div class="overflow-hidden">
    <n-card title="用户管理" :bordered="false" class="h-full rounded-8px shadow-sm">
      <div class="flex-col h-full">
        <n-space class="pb-12px" justify="space-between">
          <n-space>
            <n-button type="primary" @click="handleAddTable">
              <icon-round-plus class="mr-4px text-20px" />
              新增
            </n-button>
            <n-button type="error">
              <icon-round-delete class="mr-4px text-20px" />
              删除
            </n-button>
            <n-button type="success">
              <icon-export class="mr-4px text-20px" />
              导出Excel
            </n-button>
          </n-space>
          <n-space align="center" :size="18">
            <n-button size="small" type="primary" @click="getTableData">
              <icon-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
              刷新表格
            </n-button>
            <column-setting v-model:columns="columns" />
          </n-space>
        </n-space>
        <n-data-table
          :columns="columns"
          :data="tableData"
          :loading="loading"
          :pagination="pagination"
          flex-height
          class="flex-1-hidden"
        />
        <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref, type Ref } from 'vue'
import {
  NButton,
  NPopconfirm,
  NSpace,
  NTag,
  type DataTableColumns,
  type PaginationProps
} from 'naive-ui'
import type { Gender, Row, Status } from './typing'
import { genderLabels, statusLabels } from './constant'
import { fetchUserList } from './service'
import TableActionModal, { type ModalType } from './table-action-modal.vue'
import ColumnSetting from './column-setting.vue'

const loading = ref(false)
const visible = ref(false)

const tableData = ref<Row[]>([])
function setTableData(data: Row[]) {
  tableData.value = data
}

async function getTableData() {
  loading.value = true
  const data = (await fetchUserList()) ?? []
  const list = data.map((item, index) => ({ ...item, index: index + 1, key: item.id }))
  setTimeout(() => {
    setTableData(list)
    loading.value = false
  }, 1000)
}

const columns: Ref<DataTableColumns<Row>> = ref([
  {
    type: 'selection',
    align: 'center'
  },
  {
    key: 'index',
    title: '序号',
    align: 'center'
  },
  {
    key: 'userName',
    title: '用户名',
    align: 'center'
  },
  {
    key: 'age',
    title: '用户年龄',
    align: 'center'
  },
  {
    key: 'gender',
    title: '性别',
    align: 'center',
    render: (row) => {
      if (row.gender) {
        const tagTypes: Record<Gender, NaiveUI.ThemeColor> = {
          '0': 'success',
          '1': 'warning'
        }

        return <NTag type={tagTypes[row.gender]}>{genderLabels[row.gender]}</NTag>
      }

      return <span></span>
    }
  },
  {
    key: 'phone',
    title: '手机号码',
    align: 'center'
  },
  {
    key: 'email',
    title: '邮箱',
    align: 'center'
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    render: (row) => {
      if (row.status) {
        const tagTypes: Record<Status, NaiveUI.ThemeColor> = {
          '1': 'success',
          '2': 'error',
          '3': 'warning',
          '4': 'default'
        }

        return <NTag type={tagTypes[row.status]}>{statusLabels[row.status]}</NTag>
      }
      return <span></span>
    }
  },
  {
    key: 'actions',
    title: '操作',
    align: 'center',
    render: (row) => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size={'small'}>删除</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      )
    }
  }
]) as Ref<DataTableColumns<Row>>

const modalType = ref<ModalType>('add')

function setModalType(type: ModalType) {
  modalType.value = type
}

const editData = ref<Row | null>(null)

function setEditData(data: Row | null) {
  editData.value = data
}

function handleAddTable() {
  visible.value = true
  setModalType('add')
}

function handleEditTable(rowId: string) {
  const findItem = tableData.value.find((item) => item.id === rowId)
  if (findItem) {
    setEditData(findItem)
  }
  setModalType('edit')
  visible.value = true
}

function handleDeleteTable(rowId: string) {
  window.$message.info(`点击了删除，rowId为${rowId}`)
}

const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

function init() {
  getTableData()
}

// 初始化
init()
</script>
