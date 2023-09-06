<template>
  <hover-container
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="appStore.toggleSiderCollapse"
  >
    <svg-icon v-if="appStore.siderCollapse" icon="line-md:menu-unfold-right" class="text-16px" />
    <svg-icon v-else icon="line-md:menu-unfold-left" class="text-16px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())
</script>
