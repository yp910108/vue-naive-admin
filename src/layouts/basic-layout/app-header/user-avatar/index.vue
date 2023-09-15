<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <icon-avatar class="text-32px" />
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
import { useAuthStore, useThemeStore } from '@/store'
import { HoverContainer } from '@/components'
import IconAvatar from './icon-avatar.vue'
import IconUserAvatar from './icon-user-avatar.vue'
import IconLogout from './icon-logout.vue'

const authStore = useAuthStore()
const { theme } = storeToRefs(useThemeStore())

const options = computed<DropdownOption[]>(() => [
  {
    label: $translate('layout.header.user.dropdown.userCenter'),
    key: 'user-center',
    icon: () => h(IconUserAvatar)
  },
  { type: 'divider', key: 'divider' },
  {
    label: $translate('layout.header.user.dropdown.logout'),
    key: 'logout',
    icon: () => h(IconLogout)
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
