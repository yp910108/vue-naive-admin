<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <n-global-style />
    <div class="fixed left-0 top-0 flex-col-center gap-60px size-full">
      <div
        class="loader"
        :style="{
          '--color': naiveThemeOverrides.common?.primaryColor,
          '--border-radius': naiveThemeOverrides.common?.borderRadius
        }"
      ></div>
      <n-text strong class="text-26px">{{ appName }}</n-text>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

const appName = import.meta.env.VITE_APP_NAME

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())
</script>

<style lang="scss" scoped>
@keyframes jump {
  15% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    border-bottom-right-radius: 40px;
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}
@keyframes shadow {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
.loader {
  position: relative;
  width: 48px;
  height: 48px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    background: var(--color);
  }
  &::before {
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    animation: jump 0.5s linear infinite;
  }
  &::after {
    top: 60px;
    width: 48px;
    height: 5px;
    border-radius: 50%;
    opacity: 0.5;
    animation: shadow 0.5s linear infinite;
  }
}
</style>
