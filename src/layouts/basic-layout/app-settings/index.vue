<template>
  <n-button
    type="primary"
    :class="[
      'fixed top-360px right-14px z-10000 w-42px h-42px !p-0 transition-all duration-300',
      { '!right-330px': appStore.settingDrawerVisible },
      appStore.settingDrawerVisible ? 'ease-out' : 'ease-in'
    ]"
    @click="appStore.toggleSettingDrawerVisible"
  >
    <icon-close-outlined v-if="appStore.settingDrawerVisible" class="text-24px" />
    <icon-setting-outlined v-else class="text-24px" />
  </n-button>
  <n-drawer
    display-directive="show"
    :show="appStore.settingDrawerVisible"
    :width="330"
    @mask-click="appStore.closeSettingDrawer"
  >
    <n-drawer-content :title="$translate('layout.settingDrawer.title')" :native-scrollbar="false">
      <dark-mode />
      <layout-mode />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import DarkMode from './dark-mode.vue'
import LayoutMode from './layout-mode.vue'

defineOptions({ name: 'AppSetting' })

const appStore = useAppStore()
</script>
