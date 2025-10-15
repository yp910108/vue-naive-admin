<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <n-global-style />
    <div class="fixed left-0 top-0 flex-col-center size-full">
      <img :src="ImgLogo" class="w-128px h-128px" />
      <n-h1 class="system-title">{{ appName }}</n-h1>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ImgLogo } from '@/assets'
import { useThemeStore } from '@/store'

const appName = import.meta.env.VITE_APP_NAME

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())
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
