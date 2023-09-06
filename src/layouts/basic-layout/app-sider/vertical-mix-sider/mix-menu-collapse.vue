<template>
  <n-button :text="true" class="h-36px" @click="app.toggleSiderCollapse">
    <svg-icon v-if="app.siderCollapse" icon="ph:caret-double-right-bold" class="text-16px" />
    <svg-icon v-else icon="ph:caret-double-left-bold" class="text-16px" />
  </n-button>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'

const app = useAppStore()
</script>
