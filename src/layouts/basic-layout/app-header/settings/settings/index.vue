<template>
  <n-drawer v-model:show="visible" :width="380">
    <n-drawer-content title="偏好设置" :native-scrollbar="false" closable>
      <appearance />
      <primary-color />
      <overview />
      <template #footer>
        <n-flex>
          <n-button type="primary" @click="handleCopy">
            <template #icon>
              <icon-copy class="text-16px" />
            </template>
            拷贝设置
          </n-button>
          <n-button @click="handleReset">
            <template #icon>
              <icon-reset class="text-16px" />
            </template>
            重置设置
          </n-button>
        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useClipboard } from '@vueuse/core'
import { defaultSettings } from '@/settings'
import { useSettingsStore } from '@/store'
import { IconCopy, IconReset } from './icons'
import Appearance from './appearance/index.vue'
import PrimaryColor from './primary-color/index.vue'
import Overview from './overview/index.vue'

const { copy, isSupported } = useClipboard()

const settingsStore = useSettingsStore()

const { settings } = storeToRefs(settingsStore)

const handleCopy = async () => {
  if (!isSupported) {
    return window.$message.error('您的浏览器不支持 Clipboard API')
  }
  await copy(JSON.stringify(settings.value, null, '\t'))
  window.$message.success('复制成功，请在 app 下的 `src/settings/settings.ts` 内进行覆盖')
}

const handleReset = () => {
  settingsStore.setSettings(cloneDeep(defaultSettings))
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
