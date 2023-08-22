<template>
  <dark-mode-container class="flex-center h-full" :inverted="theme.footer.inverted">
    <span>Copyright ©2021 Soybean Admin</span>
  </dark-mode-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

defineOptions({ name: 'AppFooter' })

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>
