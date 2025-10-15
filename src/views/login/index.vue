<template>
  <div class="relative flex-center h-full">
    <n-flex align="center" class="absolute left-26px top-26px">
      <img :src="ImgLogo" class="w-42px" />
      <span class="font-bold text-20px">{{ appName }}</span>
    </n-flex>
    <theme-select class="absolute right-26px top-26px" />
    <n-flex vertical>
      <n-h1 :style="{ '--n-margin': 0 }">欢迎回来 👋🏻</n-h1>
      <n-text depth="3">请输入您的帐户信息以开始管理您的项目</n-text>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        size="large"
        :show-label="false"
        class="mt-30px w-400px"
      >
        <n-form-item path="userName">
          <n-input v-model:value="model.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            placeholder="请输入密码"
          />
        </n-form-item>
      </n-form>
      <n-flex justify="space-between">
        <n-checkbox>记住账号</n-checkbox>
        <n-button text>忘记密码？</n-button>
      </n-flex>
      <n-button
        type="primary"
        size="large"
        block
        :loading="loading"
        class="mt-26px"
        @click="handleLogin"
      >
        确 定
      </n-button>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type FormInst, type FormRules } from 'naive-ui'
import { ImgLogo } from '@/assets'
import { useAuthStore } from '@/store'
import { ThemeSelect } from '@/components'

const appName = import.meta.env.VITE_APP_NAME

const formRef = ref<FormInst>()

const model = ref({
  userName: 'admin',
  password: '123456'
})

const rules: FormRules = {
  userName: {
    required: true,
    message: '请输入用户名',
    trigger: 'input'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'input'
  }
}

const loading = ref(false)

const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await formRef.value?.validate()
    const { userName, password } = model.value
    loading.value = true
    authStore.login(userName, password)
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}
</script>
