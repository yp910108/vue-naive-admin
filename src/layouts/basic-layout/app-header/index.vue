<template>
  <div
    class="flex items-center px-10px shadow-[var(--shadow)]"
    :style="{ '--shadow': themeVars.boxShadow1 }"
  >
    <collapse />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { useSettingsStore } from '@/store'
import Collapse from './collapse/index.vue'

const themeVars = useThemeVars()

const { settings } = storeToRefs(useSettingsStore())
</script>
