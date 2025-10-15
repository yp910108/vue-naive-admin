<template>
  <div
    class="flex h-full bg-[var(--bg-color)]"
    :style="{ '--bg-color': theme === 'dark' ? themeVars.bodyColor : '#f6f9f8' }"
  >
    <app-sider
      class="relative z-2 shrink-0 w-[var(--width)] transition-all-300"
      :style="{
        '--width': siderCollapse
          ? `${settings.sider.collapsedWidth}px`
          : `${settings.sider.width}px`
      }"
    />
    <div class="relative z-1 flex flex-col grow-1 w-0">
      <app-header
        class="relative z-2 shrink-0 h[var(--height)]"
        :style="{ '--height': `${settings.header.height}px` }"
      />
      <app-tab class="relative z-1 shrink-0" />
      <n-scrollbar ref="scrollRef" class="app-scroll-wrap" content-class="flex flex-col grow-1">
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

const themeVars = useThemeVars()

const { scrollRef, siderCollapse } = storeToRefs(useAppStore())

const { settings, theme } = storeToRefs(useSettingsStore())
</script>

<style lang="scss" scoped>
:deep(.app-scroll-wrap) {
  > .n-scrollbar-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
