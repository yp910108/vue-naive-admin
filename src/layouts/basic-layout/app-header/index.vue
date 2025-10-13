<template>
  <div
    class="flex items-center gap-30px px-10px shadow-[var(--shadow)]"
    :style="{ '--shadow': '0 1px 2px rgb(0 21 41 / 8%)' }"
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
      <avatar />
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ThemeSelect } from '@/components'
import Collapse from './collapse/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
import Reload from './reload/index.vue'
import Search from './search/index.vue'
import FullScreen from './full-screen/index.vue'
import Avatar from './avatar/index.vue'
</script>
