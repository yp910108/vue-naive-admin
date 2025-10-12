<template>
  <div
    class="flex items-center gap-10px px-10px shadow-[var(--shadow)]"
    :style="{ '--shadow': themeVars.boxShadow1 }"
  >
    <collapse />
    <reload />
    <breadcrumb />
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import Collapse from './collapse/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Reload from './reload/index.vue'

const themeVars = useThemeVars()
</script>
