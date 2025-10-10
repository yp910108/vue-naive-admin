<template>
  <div class="relative flex justify-center items-center h-full">
    <n-flex align="center" class="absolute left-26px top-26px">
      <img :src="ImgLogo" class="w-42px" />
      <span class="font-bold text-20px">{{ $translate('system.title') }}</span>
    </n-flex>
    <n-flex
      align="center"
      :size="0"
      class="absolute right-26px top-26px px-6px py-4px bg-[var(--bg-color)] b-rd-[var(--border-radius)]"
      :style="{
        '--border-radius': themeVars.borderRadius,
        '--bg-color': themeVars.buttonColor2Hover
      }"
    >
      <lang-select />
      <theme-select />
    </n-flex>
    <n-flex vertical>
      <n-h1 :style="{ '--n-margin': 0 }">{{ $translate('login.welcome') }}</n-h1>
      <n-text depth="3"> {{ $translate('login.tip') }} </n-text>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        size="large"
        :show-label="false"
        class="mt-30px w-400px"
      >
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
      </n-form>
      <n-flex justify="space-between">
        <n-checkbox>
          {{ $translate('login.rememberAccount') }}
        </n-checkbox>
        <n-button text>
          {{ $translate('login.forgetPassword') }}
        </n-button>
      </n-flex>
      <n-button type="primary" size="large" block class="mt-26px">
        {{ $translate('login.confirm') }}
      </n-button>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeVars, type FormRules } from 'naive-ui'
import { $translate } from '@/locales'
import { LangSelect, ThemeSelect } from '@/components'
import { ImgLogo } from './assets'
import { REGEXP_PWD } from './constants'

const themeVars = useThemeVars()

const model = ref({
  userName: 'Admin',
  password: 'abc123'
})

const rules: FormRules = {
  userName: {
    required: true,
    message: $translate('login.userNameRequired'),
    trigger: 'input'
  },
  password: [
    {
      required: true,
      message: $translate('login.passwordRequired'),
      trigger: 'input'
    },
    {
      pattern: REGEXP_PWD,
      message: $translate('login.passwordValid'),
      trigger: 'input'
    }
  ]
}
</script>
