<template>
  <hover-container
    tooltip-content="全屏"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <icon-fullscreen-exit v-if="isFullscreen" class="text-18px" />
    <icon-fullscreen v-else class="text-18px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFullscreen } from '@vueuse/core'
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

const { isFullscreen, toggle } = useFullscreen()
</script>
