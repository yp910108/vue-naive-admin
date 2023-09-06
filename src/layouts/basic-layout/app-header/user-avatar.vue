<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <svg-icon icon="avatar" class="text-32px" />
      <span class="pl-8px text-16px font-medium">
        {{ authStore.userInfo?.userName }}
      </span>
    </hover-container>
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { storeToRefs } from 'pinia'
import type { DropdownOption } from 'naive-ui'
import { IconRender } from '@/utils'
import { useAuthStore, useThemeStore } from '@/store'

const authStore = useAuthStore()
const { theme } = storeToRefs(useThemeStore())

const options = computed<DropdownOption[]>(() => [
  {
    label: $translate('layout.header.user.dropdown.userCenter'),
    key: 'user-center',
    icon: () => h(IconRender, { icon: 'carbon:user-avatar' })
  },
  { type: 'divider', key: 'divider' },
  {
    label: $translate('layout.header.user.dropdown.logout'),
    key: 'logout',
    icon: () => h(IconRender, { icon: 'carbon:logout' })
  }
])

const handleDropdown = (optionKey: string) => {
  if (optionKey === 'logout') {
    window.$dialog.info({
      title: $translate('layout.header.user.logoutDialog.title'),
      content: $translate('layout.header.user.logoutDialog.content'),
      positiveText: $translate('layout.header.user.logoutDialog.action.confirm'),
      negativeText: $translate('layout.header.user.logoutDialog.action.cancel'),
      onPositiveClick: () => {
        authStore.logout()
      }
    })
  }
}
</script>
