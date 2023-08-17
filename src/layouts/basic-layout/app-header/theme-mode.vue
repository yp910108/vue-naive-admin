<template>
  <hover-container class="w-40px" :inverted="theme.header.inverted" tooltip-content="主题模式">
    <dark-mode-switch
      class="wh-full"
      :dark="theme.darkMode"
      :customize-transition="theme.isCustomizeDarkModeTransition"
      @update:dark="themeStore.setDarkMode"
    />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>
