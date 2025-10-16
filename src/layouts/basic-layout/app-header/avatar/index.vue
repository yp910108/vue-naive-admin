<template>
  <n-dropdown :options="options" class="w-160px" @select="handleSelect">
    <icon-wrap round :padding="4">
      <n-avatar size="small" round :src="avatarUrl">
        <icon-avatar v-if="!avatarUrl" class="text-16px" />
      </n-avatar>
    </icon-wrap>
  </n-dropdown>
</template>

<script setup lang="tsx">
import { computed, ref } from 'vue'
import { NAvatar, NFlex, NText, type DropdownOption } from 'naive-ui'
import { useAuthStore } from '@/store'
import { IconWrap } from '@/components'
import { IconGithub, IconAvatar, IconLogout } from './icons'

const authStore = useAuthStore()

const avatarUrl = ref('https://avatars.githubusercontent.com/u/38527563?v=4')

const options = computed<DropdownOption[]>(() => [
  {
    key: 'header',
    type: 'render',
    render: () => (
      <NFlex align="center" size={8} class="px-10px py-6px">
        <NAvatar src={avatarUrl.value} round>
          {!avatarUrl.value && <IconAvatar />}
        </NAvatar>
        <NFlex vertical size={0}>
          <NText>{authStore.userInfo?.userName}</NText>
          <NText depth="3" class="text-12px">
            {authStore.userInfo?.phone}
          </NText>
        </NFlex>
      </NFlex>
    )
  },
  { type: 'divider', key: 'divider' },
  {
    label: '项目地址',
    key: 'user-center',
    icon: () => <IconGithub class="text-16px" />
  },
  { type: 'divider', key: 'divider' },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => <IconLogout class="text-16px" />
  }
])

const handleSelect = (key: string) => {
  if (key === 'user-center') {
    window.open('https://github.com/yp910108/vue-naive-admin', '_blank')
  } else if (key === 'logout') {
    window.$dialog.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: authStore.logout
    })
  }
}
</script>
