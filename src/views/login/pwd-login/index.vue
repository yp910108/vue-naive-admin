<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="userName">
      <n-input
        v-model:value="model.userName"
        :placeholder="$translate('login.userNamePlaceholder')"
      />
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$translate('login.passwordPlaceholder')"
      />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">
          {{ $translate('login.pwdLogin.rememberMe') }}
        </n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">
          {{ $translate('login.pwdLogin.forgetPassword') }}
        </n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="authStore.loginLoading"
        @click="handleSubmit"
      >
        {{ $translate('login.confirm') }}
      </n-button>
      <div class="flex-y-center justify-between">
        <n-button class="flex-1" :block="true" @click="toLoginModule('code-login')">
          {{ $translate('login.codeLogin.title') }}
        </n-button>
        <div class="w-12px"></div>
        <n-button class="flex-1" :block="true" @click="toLoginModule('register')">
          {{ $translate('login.register.title') }}
        </n-button>
      </div>
    </n-space>
    <other-account @login="handleLoginOtherAccount" />
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { REGEXP_PWD } from '@/constants'
import { useAuthStore } from '@/store'
import { useToLoginModule } from '../hooks'
import OtherAccount from './other-account.vue'

const authStore = useAuthStore()
const { login } = useAuthStore()
const { toLoginModule } = useToLoginModule()

const formRef = ref<HTMLElement & FormInst>()

const model = reactive({
  userName: 'Soybean',
  password: 'soybean123'
})

const rules: FormRules = {
  userName: {
    required: true,
    message: $translate('login.form.userNameRequired'),
    trigger: 'input'
  },
  password: [
    { required: true, message: $translate('login.form.passwordRequired'), trigger: 'input' },
    { pattern: REGEXP_PWD, message: $translate('login.form.passwordValid'), trigger: 'input' }
  ]
}

const rememberMe = ref(false)

const handleSubmit = async () => {
  await formRef.value?.validate()

  const { userName, password } = model

  login(userName, password)
}

const handleLoginOtherAccount = (param: { userName: string; password: string }) => {
  const { userName, password } = param
  login(userName, password)
}
</script>
