<template>
  <n-drawer v-model:show="visible" :width="380">
    <n-drawer-content title="偏好设置" :native-scrollbar="false" closable>
      <appearance />
      <primary-color />
      <overview />
      <template #footer>
        <n-flex>
          <n-button type="primary" @click="handleCopy">复制偏好设置</n-button>
          <n-button @click="handleReset">重置偏好设置</n-button>
        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { defaultSettings } from '@/settings'
import { useSettingsStore } from '@/store'
import Appearance from './appearance/index.vue'
import PrimaryColor from './primary-color/index.vue'
import Overview from './overview/index.vue'

const { copy, isSupported } = useClipboard()

const settingsStore = useSettingsStore()

const handleCopy = async () => {
  if (!isSupported) {
    return window.$message.error('您的浏览器不支持 Clipboard API')
  }
  await copy(JSON.stringify(settingsStore.settings, null, '\t'))
  window.$message.success('复制成功，请在 app 下的 `src/settings/settings.ts` 内进行覆盖')
}

const handleReset = () => {
  settingsStore.settings = cloneDeep(defaultSettings)
}

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
