<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    :title="isEdit ? '修改用户' : '添加用户'"
    :mask-closable="false"
    :style="{ width: '550px' }"
    @after-leave="handeAfterLeave"
  >
    <n-spin :show="spinning">
      <n-form ref="formRef" label-placement="left" label-width="80" :model="model" :rules="rules">
        <n-form-item label="用户姓名" path="name">
          <n-input v-model:value="model.name" clearable :maxlength="200" />
        </n-form-item>
        <n-form-item label="用户性别" path="sex">
          <n-select v-model:value="model.sex" :options="sexOptions" clearable filterable />
        </n-form-item>
        <n-form-item label="年龄" path="age">
          <n-input-number
            v-model:value="model.age"
            :min="1"
            :max="100"
            :precision="0"
            clearable
            class="w-full"
          />
        </n-form-item>
        <n-form-item label="出生日期" path="birthDate">
          <n-date-picker v-model:formatted-value="model.birthDate" clearable class="w-full" />
        </n-form-item>
        <n-form-item label="政治面貌" path="politics">
          <n-select
            v-model:value="model.politics"
            :options="politicsOptions"
            clearable
            filterable
          />
        </n-form-item>
        <n-form-item label="家庭住址" path="addressId">
          <n-cascader
            v-model:value="model.addressId"
            :options="addressOptions"
            check-strategy="child"
            clearable
            filterable
          />
        </n-form-item>
        <n-form-item label="所属组织" path="deptId">
          <n-tree-select
            v-model:value="model.deptId"
            :options="deptOptions"
            clearable
            filterable
            default-expand-all
          />
        </n-form-item>
        <n-form-item label="备注" path="remark">
          <n-input v-model:value="model.remark" type="textarea" clearable :maxlength="2000" />
        </n-form-item>
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
import { computed, ref, shallowRef } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { transformObjectTruthy } from '@/utils'
import type { Model, Row } from './typings'
import { addressOptions, deptOptions, politicsOptions, sexOptions } from './constants'
import { fetchDetail, add, edit } from './service'

interface Emits {
  (e: 'refresh'): void
}

const emit = defineEmits<Emits>()

const spinning = ref(false)
const saveLoading = ref(false)
const saveAble = ref(true)

const formRef = ref<FormInst>()

const row = shallowRef<Row>()

const isEdit = computed(() => !!row.value && !!Object.keys(row.value).length)

const defaultModel: Model = {
  id: null,
  name: null,
  sex: '1',
  age: null,
  birthDate: null,
  politics: '3',
  addressId: null,
  deptId: null,
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
    }
  } catch (e) {
    spinning.value = false
  }
}

const handleSave = () => {
  formRef.value?.validate(async (errors) => {
    if (errors) return
    const params = transformObjectTruthy(model.value)
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
