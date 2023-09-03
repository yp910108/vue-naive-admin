<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" :placeholder="$translate('login.phonePlaceholder')" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center w-full">
        <n-input v-model:value="model.code" :placeholder="$translate('login.codePlaceholder')" />
        <div class="w-18px"></div>
        <n-button size="large" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
          {{ label }}
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="pwd">
      <n-input
        v-model:value="model.pwd"
        type="password"
        show-password-on="click"
        :placeholder="$translate('login.passwordPlaceholder')"
      />
    </n-form-item>
    <n-form-item path="confirmPwd">
      <n-input
        v-model:value="model.confirmPwd"
        type="password"
        show-password-on="click"
        :placeholder="$translate('login.confirmPasswordPlaceholder')"
      />
    </n-form-item>
    <n-space :vertical="true" :size="18">
      <login-agreement v-model:value="agreement" />
      <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">
        {{ $translate('login.confirm') }}
      </n-button>
      <n-button size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">
        {{ $translate('login.back') }}
      </n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { REGEXP_PHONE, REGEXP_CODE_SIX, REGEXP_PWD } from '@/constants'
import { useSmsCode, useToLoginModule } from '../hooks'
import LoginAgreement from './agreement.vue'

const { toLoginModule } = useToLoginModule()
const { label, isCounting, loading: smsLoading, getSmsCode } = useSmsCode()

const formRef = ref<HTMLElement & FormInst>()

const model = reactive({
  phone: '',
  code: '',
  pwd: '',
  confirmPwd: ''
})

const rules: FormRules = {
  phone: [
    {
      required: true,
      message: $translate('login.form.phoneRequired'),
      trigger: 'input'
    },
    {
      pattern: REGEXP_PHONE,
      message: $translate('login.form.phoneInvalid'),
      trigger: 'input'
    }
  ],
  code: [
    {
      required: true,
      message: $translate('login.form.codeRequired'),
      trigger: 'input'
    },
    {
      pattern: REGEXP_CODE_SIX,
      message: $translate('login.form.codeInvalid'),
      trigger: 'input'
    }
  ],
  pwd: [
    {
      required: true,
      message: $translate('login.form.passwordRequired'),
      trigger: 'input'
    },
    {
      pattern: REGEXP_PWD,
      message: $translate('login.form.passwordValid'),
      trigger: 'input'
    }
  ],
  confirmPwd: [
    {
      required: true,
      message: $translate('login.form.confirmPasswordRequired'),
      trigger: 'input'
    },
    {
      validator: (rule, value) => {
        if (!(value.trim() === '') && value !== model.pwd) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      },
      message: $translate('login.form.confirmPasswordInvalid'),
      trigger: 'input'
    }
  ]
}

const agreement = ref(false)

const handleSmsCode = () => {
  getSmsCode(model.phone)
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  window.$message.success($translate('login.validateSuccess'))
}
</script>
