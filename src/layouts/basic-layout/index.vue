<template>
  <div
    class="flex h-full bg-[var(--bg-color)] transition-all"
    :style="{ '--bg-color': theme === 'dark' ? themeVars.bodyColor : '#f6f9f8' }"
  >
    <div v-if="showMask" :class="maskCls" @click="handleMaskClick"></div>
    <app-sider :class="siderClass" :style="{ '--width': siderWidth }" />
    <div class="relative z-1 flex-col grow-1 w-0">
      <app-header
        class="relative z-2 shrink-0 h[var(--height)]"
        :style="{ '--height': `${settings.header.height}px` }"
      />
      <app-tab v-if="settings.tab.visible" class="relative z-1 shrink-0" />
      <n-scrollbar ref="scrollRef" class="app-scroll-wrap" content-class="flex-col grow-1">
        <app-content class="grow-1 p-16px" />
        <n-back-top class="z-3" />
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { useAppStore, useSettingsStore } from '@/store'
import { AppContent } from '../components'
import AppSider from './app-sider/index.vue'
import AppHeader from './app-header/index.vue'
import AppTab from './app-tab/index.vue'
import { useSider } from './hooks'

const themeVars = useThemeVars()

const { scrollRef } = storeToRefs(useAppStore())

const { settings, theme } = storeToRefs(useSettingsStore())

const { showMask, maskCls, handleMaskClick, siderWidth, siderClass } = useSider()
</script>

<style lang="scss" scoped>
:deep(.app-scroll-wrap) {
  > .n-scrollbar-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
