<template>
  <n-config-provider abstract :theme="naiveTheme" :theme-overrides="naiveThemeOverrides">
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore, subscribeStore } from './store'

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

subscribeStore()
</script>
