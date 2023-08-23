<template>
  <n-divider title-placement="center">
    {{ $t('layout.settingDrawer.themeConfiguration.title') }}
  </n-divider>
  <textarea id="themeConfigCopyTarget" :value="JSON.stringify(theme, null, '\t')"></textarea>
  <n-space vertical>
    <div ref="copyRef" data-clipboard-target="#themeConfigCopyTarget">
      <n-button type="primary" block>
        {{ $t('layout.settingDrawer.themeConfiguration.copy') }}
      </n-button>
    </div>
    <n-button type="warning" block @click="handleResetConfig">
      {{ $t('layout.settingDrawer.themeConfiguration.reset') }}
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ClipboardJS from 'clipboard'
import { $t } from '@/locales'
import { renderIcon } from '@/utils'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const copyRef = ref<HTMLDivElement>()

const handleResetConfig = () => {
  window.$message?.success($t('layout.settingDrawer.themeConfiguration.resetSuccess'))
}

onMounted(() => {
  const copy = new ClipboardJS(copyRef.value!)
  copy.on('success', () => {
    window.$dialog?.info({
      title: $t('layout.settingDrawer.themeConfiguration.operateSuccess'),
      content: $t('layout.settingDrawer.themeConfiguration.copySuccess'),
      positiveText: $t('layout.settingDrawer.themeConfiguration.confirmCopy'),
      icon: renderIcon({ icon: 'success-filled' })
    })
  })
})
</script>
