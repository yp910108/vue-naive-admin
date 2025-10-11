<template>
  <div class="flex flex-col">
    <app-logo
      class="flex-shrink-0 h-[var(--height)]"
      :style="{ '--height': `${settings.sider.logoHeight}px` }"
    />
    <app-menu class="grow-1 h-0" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store'
import AppLogo from './logo.vue'
import AppMenu from './menu/index.vue'

const { settings } = storeToRefs(useSettingsStore())
</script>
