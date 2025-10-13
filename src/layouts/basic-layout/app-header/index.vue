<template>
  <div
    class="flex items-center gap-30px px-10px shadow-[var(--shadow)]"
    :style="{ '--shadow': themeVars.boxShadow1 }"
  >
    <n-flex align="center" :size="10" class="shrink-0">
      <collapse />
      <reload />
      <breadcrumb />
    </n-flex>
    <n-flex justify="flex-end" align="center" :size="10" class="grow-1">
      <search />
      <theme-select />
      <full-screen />
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { ThemeSelect } from '@/components'
import Collapse from './collapse/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Reload from './reload/index.vue'
import Search from './search/index.vue'
import FullScreen from './full-screen/index.vue'

const themeVars = useThemeVars()
</script>
