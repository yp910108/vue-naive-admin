<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <n-global-style />
    <div
      class="fixed left-0 top-0 flex flex-col justify-center items-center w-full h-full"
      :style="{ '--color': themeVars.primaryColor }"
    >
      <img :src="ImgLogo" class="w-128px h-128px" />
      <n-h1 class="system-title">
        {{ $translate('system.title') }}
      </n-h1>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { ImgLogo } from '@/assets'
import { $translate } from '@/locales'
import { useThemeStore } from '@/store'

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

const themeVars = useThemeVars()
</script>

<style lang="scss" scoped>
@-webkit-keyframes shine {
  0% {
    color: rgba(0, 0, 0, 0.3);
  }
  100% {
    color: rgba(255, 255, 255, 0.3);
  }
}
@keyframes shine {
  0% {
    color: rgba(0, 0, 0, 0.3);
  }
  100% {
    color: rgba(255, 255, 255, 0.3);
  }
}
.system-title {
  background: linear-gradient(90deg, #c550d3, #57d1da, #a1dad1);
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 1s linear infinite alternate;
  -webkit-animation: shine 1s linear infinite alternate;
}
</style>
