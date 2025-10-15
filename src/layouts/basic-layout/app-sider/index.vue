<template>
  <theme-wrap class="flex-col shadow-[var(--shadow)]" :style="{ '--shadow': themeVars.boxShadow1 }">
    <app-logo
      class="flex-shrink-0 h-[var(--height)]"
      :style="{ '--height': `${settings.sider.logoHeight}px` }"
    />
    <app-menu class="grow-1 h-0" />
  </theme-wrap>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { useSettingsStore } from '@/store'
import { ThemeWrap } from '@/components'
import AppLogo from './logo.vue'
import AppMenu from './menu/index.vue'

const themeVars = useThemeVars()

const { settings } = storeToRefs(useSettingsStore())
</script>
