<template>
  <dark-mode-container class="flex h-full" :inverted="theme.sider.inverted"> </dark-mode-container>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>
