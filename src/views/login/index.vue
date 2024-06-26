<template>
  <div
    class="relative flex justify-center items-center w-full h-full"
    :style="{ '--primary-color': themeVars.primaryColor, backgroundColor: bgColor }"
  >
    <dark-mode-switch
      class="absolute left-48px top-24px z-3"
      :dark="theme.darkMode"
      @update:dark="setDarkMode"
    />
    <lang-select container-class="absolute right-37px top-13px z-3" />
    <n-card :bordered="false" size="large" class="z-4 !w-auto rounded-20px shadow-sm">
      <div class="w-300px sm:w-360px">
        <header class="flex justify-between items-center">
          <icon-logo class="text-64px text-[var(--primary-color)]" />
          <n-gradient-text type="primary" :size="28">
            {{ $translate('system.title') }}
          </n-gradient-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">
            {{ $translate(activeType.label) }}
          </h3>
          <div class="pt-24px">
            <transition name="fade-slide" mode="out-in" appear>
              <component :is="activeType.component" />
            </transition>
          </div>
        </main>
      </div>
    </n-card>
    <login-bg :theme-color="bgThemeColor" />
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeVars } from 'naive-ui'
import { getColorPalette, mixColor } from '@/utils'
import { useThemeStore } from '@/store'
import { DarkModeSwitch, LangSelect } from '@/components'
import type { LoginModule } from './typings'
import IconLogo from './icon-logo.vue'
import LoginBg from './login-bg/index.vue'
import PwdLogin from './pwd-login/index.vue'
import CodeLogin from './code-login/index.vue'
import BindWechat from './bind-wechat/index.vue'
import ResetPwd from './reset-pwd/index.vue'
import Register from './register/index.vue'

const themeVars = useThemeVars()

const route = useRoute()

const { theme, setDarkMode } = useThemeStore()

const bgThemeColor = computed(() =>
  theme.darkMode ? getColorPalette(theme.primaryColor, 7) : theme.primaryColor
)

const bgColor = computed(() => {
  const COLOR_WHITE = '#fff'
  const ratio = theme.darkMode ? 0.5 : 0.2
  return mixColor(COLOR_WHITE, theme.primaryColor, ratio)
})

interface LoginType {
  key: LoginModule
  label: string
  component: Component
}

const types: LoginType[] = [
  { key: 'pwd-login', label: 'login.pwdLogin.title', component: PwdLogin },
  { key: 'code-login', label: 'login.codeLogin.title', component: CodeLogin },
  { key: 'register', label: 'login.register.title', component: Register },
  { key: 'reset-pwd', label: 'login.resetPwd.title', component: ResetPwd },
  {
    key: 'bind-wechat',
    label: 'login.bindWeChat.title',
    component: BindWechat
  }
]

const activeType = computed(() => {
  const { module } = route.params
  const active = types.find((item) => item.key === module)
  return active ?? types[0]
})
</script>
