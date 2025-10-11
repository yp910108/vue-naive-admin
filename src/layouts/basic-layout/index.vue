<template>
  <div class="flex h-full">
    <app-sider
      class="shrink-0 w-[var(--width)] transition-all-300"
      :style="{
        '--width': appStore.siderCollapse
          ? `${settings.sider.collapsedWidth}px`
          : `${settings.sider.width}px`
      }"
    />
    <div class="flex flex-col grow-1 w-0">
      <app-header
        class="shrink-0 h[var(--height)]"
        :style="{ '--height': `${settings.header.height}px` }"
      />
      <!-- <app-tab class="z-98 flex-shrink-0" />
      <app-content class="flex-grow-1" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useSettingsStore } from '@/store'
// import AppContent from '../components/app-content/index.vue'
import AppSider from './app-sider/index.vue'
import AppHeader from './app-header/index.vue'
// import AppTab from './app-tab/index.vue'

const appStore = useAppStore()

const { settings } = storeToRefs(useSettingsStore())
</script>
