<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="phone">
      <n-input
        v-model:value="model.phone"
        :placeholder="$translate('page.login.common.phonePlaceholder')"
      />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center w-full">
        <n-input
          v-model:value="model.code"
          :placeholder="$translate('page.login.common.codePlaceholder')"
        />
        <div class="w-18px"></div>
        <n-button size="large" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
          {{ label }}
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="imgCode">
      <n-input
        v-model:value="model.imgCode"
        :placeholder="$translate('page.login.codeLogin.imageCodePlaceholder')"
      />
      <div class="pl-8px">
        <image-verify v-model:code="imgCode" />
      </div>
    </n-form-item>
    <n-space :vertical="true" :size="18">
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        {{ $translate('page.login.common.confirm') }}
      </n-button>
      <n-button size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">
        {{ $translate('page.login.common.back') }}
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useAuthStore } from '@/store'
import { REGEXP_PHONE, REGEXP_CODE_SIX } from '@/constants'
import { $translate } from '@/locales'
import ImageVerify from './image-verify/index.vue'
import { useSmsCode, useToLoginModule } from '../hooks'

const auth = useAuthStore()
const { toLoginModule } = useToLoginModule()
const { label, isCounting, loading: smsLoading, getSmsCode } = useSmsCode()

const formRef = ref<HTMLElement & FormInst>()

const model = reactive({
  phone: '',
  code: '',
  imgCode: ''
})

const imgCode = ref('')

const rules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: 'input' }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: REGEXP_CODE_SIX, message: '验证码格式错误', trigger: 'input' }
  ],
  imgCode: [
    { required: true, message: '请输入验证码' },
    {
      validator: (rule, value) => {
        if (!(value.trim() === '') && value !== imgCode.value) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      },
      message: '验证码不正确',
      trigger: 'blur'
    }
  ]
}

const handleSmsCode = () => {
  getSmsCode(model.phone)
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  window.$message?.success($translate('page.login.common.validateSuccess'))
}
</script>
