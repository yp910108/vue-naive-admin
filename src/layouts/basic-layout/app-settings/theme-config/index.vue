<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settings.themeConfig.title') }}
  </n-divider>
  <n-space vertical>
    <n-button type="primary" block @click="handleCopy">
      {{ $translate('layout.settings.themeConfig.copy') }}
    </n-button>
    <n-button type="warning" block @click="handleResetConfig">
      {{ $translate('layout.settings.themeConfig.reset') }}
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { storeToRefs } from 'pinia'
import { useClipboard } from '@vueuse/core'
import { useThemeStore } from '@/store'
import IconSuccess from './icon-success.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const { copy, isSupported } = useClipboard()

const handleCopy = async () => {
  if (!isSupported) {
    return window.$message.error('您的浏览器不支持 Clipboard API')
  }
  await copy(JSON.stringify(theme.value, null, '\t'))
  window.$dialog.info({
    title: window.$translate('layout.settings.themeConfig.operateSuccess'),
    content: window.$translate('layout.settings.themeConfig.copySuccess'),
    positiveText: window.$translate('layout.settings.themeConfig.confirmCopy'),
    icon: () => h(IconSuccess)
  })
}

const handleResetConfig = () => {
  themeStore.reset()
  window.$message.success(window.$translate('layout.settings.themeConfig.resetSuccess'))
}
</script>
