<template>
  <n-config-provider
    abstract
    inline-theme-disabled
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { zhCN, dateZhCN } from 'naive-ui'
import { useThemeStore, subscribeStore } from './store'

const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

subscribeStore()
</script>
