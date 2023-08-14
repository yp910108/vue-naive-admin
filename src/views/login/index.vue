<template>
  <div class="relative flex-center wh-full" :style="{ backgroundColor: bgColor }">
    <dark-mode-switch
      :dark="theme.darkMode"
      class="absolute left-48px top-24px z-3"
      @update:dark="setDarkMode"
    />
    <n-card :bordered="false" size="large" class="z-4 !w-auto rounded-20px shadow-sm">
      <div class="w-300px sm:w-360px">
        <header class="flex-y-center justify-between">
          <system-logo class="text-64px text-primary" />
          <n-gradient-text type="primary" :size="28">
            {{ $translate('system.title') }}
          </n-gradient-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">{{ activeModule.label }}</h3>
          <div class="pt-24px">
            <transition name="fade-slide" mode="out-in" appear>
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </n-card>
    <login-bg :theme-color="bgThemeColor" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { getColorPalette, mixColor } from '@/utils'
import { useThemeStore } from '@/store'
import { loginModuleLabels } from '@/constants'
import { BindWechat, CodeLogin, LoginBg, PwdLogin, Register, ResetPwd } from './components'

interface Props {
  module: UnionKey.LoginModule
}

const props = defineProps<Props>()

const { theme, setDarkMode } = useThemeStore()

const bgThemeColor = computed(() =>
  theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor
)

const bgColor = computed(() => {
  const COLOR_WHITE = '#fff'
  const ratio = theme.darkMode ? 0.5 : 0.2
  return mixColor(COLOR_WHITE, theme.themeColor, ratio)
})

interface LoginModule {
  key: UnionKey.LoginModule
  label: string
  component: Component
}

const modules: LoginModule[] = [
  { key: 'pwd-login', label: loginModuleLabels['pwd-login'], component: PwdLogin },
  { key: 'code-login', label: loginModuleLabels['code-login'], component: CodeLogin },
  { key: 'register', label: loginModuleLabels.register, component: Register },
  { key: 'reset-pwd', label: loginModuleLabels['reset-pwd'], component: ResetPwd },
  { key: 'bind-wechat', label: loginModuleLabels['bind-wechat'], component: BindWechat }
]

const activeModule = computed(() => {
  const { module } = props
  const active = modules.find((item) => item.key === module)
  return active ?? modules[0]
})
</script>
