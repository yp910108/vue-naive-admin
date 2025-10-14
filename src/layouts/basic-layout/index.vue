<template>
  <div class="flex h-full bg-#f6f9f8">
    <app-sider
      class="relative z-2 shrink-0 w-[var(--width)] transition-all-300"
      :style="{
        '--width': appStore.siderCollapse
          ? `${settings.sider.collapsedWidth}px`
          : `${settings.sider.width}px`
      }"
    />
    <div class="relative z-1 flex flex-col grow-1 w-0">
      <app-header
        class="shrink-0 h[var(--height)]"
        :style="{ '--height': `${settings.header.height}px` }"
      />
      <app-tab class="shrink-0" />
      <app-content class="grow-1 p-16px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useSettingsStore } from '@/store'
import { AppContent } from '../components'
import AppSider from './app-sider/index.vue'
import AppHeader from './app-header/index.vue'
import AppTab from './app-tab/index.vue'

const appStore = useAppStore()

const { settings } = storeToRefs(useSettingsStore())
</script>
