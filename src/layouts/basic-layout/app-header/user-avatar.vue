<template>
  <n-dropdown :options="options">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <icon-avatar class="text-32px" />
      <span class="pl-8px text-16px font-medium">{{ authStore.userInfo?.userName }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { renderIcon } from '@/utils'
import { useAuthStore, useThemeStore } from '@/store'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const options: DropdownOption[] = [
  { label: '用户中心', key: 'user-center', icon: renderIcon({ icon: 'user-avatar' }) },
  { type: 'divider', key: 'divider' },
  { label: '退出登录', key: 'logout', icon: renderIcon({ icon: 'logout' }) }
]
</script>
