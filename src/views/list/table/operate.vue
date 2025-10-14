<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    :title="isEdit ? '修改用户' : '添加用户'"
    :mask-closable="false"
    :style="{ width: '750px' }"
    @after-leave="handeAfterLeave"
  >
    <n-spin :show="spinning">
      <n-form ref="formRef" label-placement="left" label-width="80" :model="model" :rules="rules">
        <n-grid :cols="2" :x-gap="24">
          <n-form-item-gi label="用户姓名" path="name">
            <n-input v-model:value="model.name" clearable :maxlength="200" />
          </n-form-item-gi>
          <n-form-item-gi label="用户性别" path="sex">
            <n-select v-model:value="model.sex" :options="sexDict" clearable filterable />
          </n-form-item-gi>
          <n-form-item-gi label="年龄" path="age">
            <n-input-number
              v-model:value="model.age"
              :min="1"
              :max="100"
              :precision="0"
              clearable
              class="w-full"
            />
          </n-form-item-gi>
          <n-form-item-gi label="出生日期" path="birthDate">
            <n-date-picker v-model:formatted-value="model.birthDate" clearable class="w-full" />
          </n-form-item-gi>
          <n-form-item-gi label="政治面貌" path="politics">
            <n-select v-model:value="model.politics" :options="politicsDict" clearable filterable />
          </n-form-item-gi>
          <n-form-item-gi label="家庭住址" path="addressId">
            <n-cascader
              v-model:value="model.addressId"
              :options="addressOptions"
              check-strategy="child"
              clearable
              filterable
            />
          </n-form-item-gi>
          <n-form-item-gi label="所属组织" path="deptId">
            <n-tree-select
              v-model:value="model.deptId"
              :options="deptOptions"
              clearable
              filterable
              default-expand-all
            />
          </n-form-item-gi>
          <n-form-item-gi label="上级领导" path="leader">
            <list-select
              v-model:value="model.leader"
              title="选择人员"
              :columns="leaderColumns"
              :request="leaderMethodRequest"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="2" label="备注" path="remark">
            <n-input v-model:value="model.remark" type="textarea" clearable :maxlength="2000" />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-spin>
    <template #footer>
      <n-space justify="end">
        <n-button @click="hide">取 消</n-button>
        <n-button type="primary" :loading="saveLoading" :disabled="!saveAble" @click="handleSave">
          确 定
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, h, ref, shallowRef } from 'vue'
import { NInputNumber, type FormInst, type FormRules } from 'naive-ui'
import { removeInvalidValues, transformOptionToValueLabel } from '@/utils'
import { useDict } from '@/hooks'
import { ListSelect, type ProTableColumn, type ProTableRequestParams } from '@/components'
import type { BackendModel, FetchListParams, Model, Row } from './typings'
import { addressOptions, deptOptions } from './constants'
import { fetchUserList, fetchDetail, add, edit } from './service'

interface Emits {
  (e: 'refresh'): void
}

const emit = defineEmits<Emits>()

const sexDict = useDict('sex')

const sexValueLabel = computed(() => transformOptionToValueLabel(sexDict.value))

const politicsDict = useDict('politics')

const leaderColumns = ref<ProTableColumn<Row>[]>([
  { type: 'selection', multiple: false },
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
  }
])

const leaderMethodRequest = async ({
  birthDate,
  page,
  pageSize,
  ...rest
}: ProTableRequestParams) => {
  const params: FetchListParams = { ...rest, page: page!, pageSize: pageSize! }
  if (birthDate && birthDate.length) {
    params.startBirthDate = birthDate[0]
    params.endBirthDate = birthDate[1]
  }
  const { total, list } = (await fetchUserList(params)) ?? {}
  return { itemCount: total, data: list }
}

const formRef = ref<FormInst>()

const defaultModel: Model = {
  name: null,
  sex: '1',
  age: null,
  birthDate: null,
  politics: '3',
  addressId: null,
  deptId: null,
  leader: null,
  remark: null
}

const model = ref<Model>({ ...defaultModel })

const rules = ref<FormRules>({
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入'
  },
  sex: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择'
  }
})

const setModel = async () => {
  try {
    spinning.value = true
    saveAble.value = false
    const res = await fetchDetail(row.value?.id!)
    spinning.value = false
    saveAble.value = true
    if (res) {
      for (const key in model.value) {
        ;(model.value as any)[key] = (res as any)[key]
      }
      if (res.leaderId && res.leaderName) {
        model.value.leader = {
          id: res.leaderId,
          name: res.leaderName
        }
      }
    }
  } catch (e) {
    spinning.value = false
  }
}

const handleSave = () => {
  formRef.value?.validate(async (errors) => {
    if (errors) return
    const { leader, ...rest } = removeInvalidValues(model.value)!
    const params: BackendModel = { ...rest }
    if (leader) {
      params.leaderId = leader.id
      params.leaderName = leader.name
    }
    try {
      saveLoading.value = true
      if (isEdit.value) {
        await edit(row.value?.id!, params!)
      } else {
        await add(params!)
      }
      saveLoading.value = false
      window.$message.success(isEdit.value ? '修改用户成功' : '添加用户成功')
      emit('refresh')
      hide()
    } catch (e) {
      saveLoading.value = false
    }
  })
}

const handeAfterLeave = () => {
  model.value = { ...defaultModel }
}

const visible = ref(false)

const spinning = ref(false)

const saveLoading = ref(false)

const saveAble = ref(true)

const isEdit = computed(() => !!row.value && !!Object.keys(row.value).length)

const row = shallowRef<Row>()

const show = (_row?: Row) => {
  visible.value = true
  row.value = _row
  if (isEdit.value) {
    setModel()
  }
}

const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
