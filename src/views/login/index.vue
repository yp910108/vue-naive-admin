<template>
  <div class="relative flex-center h-full">
    <theme-select class="absolute right-26px top-26px" />
    <theme-wrap
      class="flex-col px-32px py-50px b-rd-[var(--border-rdaius)] shadow-[var(--shadow)]"
      :style="{
        '--border-rdaius': themeVars.borderRadius,
        '--shadow': themeVars.boxShadow1
      }"
    >
      <n-flex justify="center" align="center">
        <img :src="ImgLogo" class="w-42px" />
        <span class="font-bold text-20px">{{ appName }}</span>
      </n-flex>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        size="large"
        :show-label="false"
        class="mt-30px w-300px"
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
    </theme-wrap>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeVars, type FormInst, type FormRules } from 'naive-ui'
import { ImgLogo } from '@/assets'
import { useAuthStore } from '@/store'
import { ThemeSelect, ThemeWrap } from '@/components'

const appName = import.meta.env.VITE_APP_NAME

const themeVars = useThemeVars()

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
