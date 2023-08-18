<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="userName">
      <n-input
        v-model:value="model.userName"
        :placeholder="$translate('page.login.common.userNamePlaceholder')"
      />
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$translate('page.login.common.passwordPlaceholder')"
      />
    </n-form-item>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">
          {{ $translate('page.login.pwdLogin.rememberMe') }}
        </n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">
          {{ $translate('page.login.pwdLogin.forgetPassword') }}
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
        {{ $translate('page.login.common.confirm') }}
      </n-button>
      <div class="flex-y-center justify-between">
        <n-button class="flex-1" :block="true" @click="toLoginModule('code-login')">
          {{ loginModuleLabels['code-login'] }}
        </n-button>
        <div class="w-12px"></div>
        <n-button class="flex-1" :block="true" @click="toLoginModule('register')">
          {{ loginModuleLabels.register }}
        </n-button>
      </div>
    </n-space>
    <other-account @login="handleLoginOtherAccount" />
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { loginModuleLabels } from '@/constants'
import { REGEXP_PWD } from '@/utils'
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
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: REGEXP_PWD,
      message: '密码为 6-18 位数字/字符/符号，至少 2 种组合',
      trigger: 'input'
    }
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
