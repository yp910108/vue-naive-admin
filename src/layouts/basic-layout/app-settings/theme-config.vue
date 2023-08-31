<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settingDrawer.themeConfiguration.title') }}
  </n-divider>
  <n-space vertical>
    <n-button type="primary" block @click="handleCopy">
      {{ $translate('layout.settingDrawer.themeConfiguration.copy') }}
    </n-button>
    <n-button type="warning" block @click="handleResetConfig">
      {{ $translate('layout.settingDrawer.themeConfiguration.reset') }}
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import { useClipboard } from '@vueuse/core'
import { IconRender } from '@/utils'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const { copy, isSupported } = useClipboard()

const handleCopy = async () => {
  if (!isSupported) {
    return window.$message?.error('您的浏览器不支持 Clipboard API')
  }
  await copy(JSON.stringify(theme, null, '\t'))
  window.$dialog?.info({
    title: window.$translate('layout.settingDrawer.themeConfiguration.operateSuccess'),
    content: window.$translate('layout.settingDrawer.themeConfiguration.copySuccess'),
    positiveText: window.$translate('layout.settingDrawer.themeConfiguration.confirmCopy'),
    icon: () => h(IconRender, { icon: 'success-filled' })
  })
}

const handleResetConfig = () => {
  themeStore.reset()
  window.$message?.success(
    window.$translate('layout.settingDrawer.themeConfiguration.resetSuccess')
  )
}
</script>
