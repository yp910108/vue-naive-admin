<template>
  <hover-container
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="appStore.toggleSiderCollapse"
  >
    <icon-menu-unfold-left v-if="appStore.siderCollapse" class="text-16px" />
    <icon-menu-fold-left v-else class="text-16px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())
</script>
