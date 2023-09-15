<template>
  <hover-container
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="appStore.toggleSiderCollapse"
  >
    <icon-fold v-if="appStore.siderCollapse" class="text-16px" />
    <icon-unfold v-else class="text-16px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'
import { HoverContainer } from '@/components'
import IconFold from './icon-fold.vue'
import IconUnfold from './icon-unfold.vue'

const appStore = useAppStore()
const { theme } = storeToRefs(useThemeStore())
</script>
