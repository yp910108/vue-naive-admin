<template>
  <hover-container
    class="w-40px"
    :tooltip-content="$translate('layout.header.themeMode.tooltip')"
    :inverted="theme.header.inverted"
  >
    <dark-mode-switch
      class="w-full h-full"
      :dark="theme.darkMode"
      @update:dark="themeStore.setDarkMode"
    />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { DarkModeSwitch, HoverContainer } from '@/components'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>
