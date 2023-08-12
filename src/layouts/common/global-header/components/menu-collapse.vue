<template>
  <hover-container
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="app.toggleSiderCollapse"
  >
    <icon-menu-unfold-left v-if="app.siderCollapse" class="text-16px" />
    <icon-menu-fold-left v-else class="text-16px" />
  </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store'

defineOptions({ name: 'MenuCollapse' })

const app = useAppStore()
const { theme } = useThemeStore()
</script>
