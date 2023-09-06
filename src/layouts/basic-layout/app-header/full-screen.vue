<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="$translate('layout.header.themeMode.tooltip')"
    :inverted="theme.header.inverted"
    @click="toggle"
  >
    <svg-icon v-if="isFullscreen" icon="gridicons:fullscreen-exit" class="text-18px" />
    <svg-icon v-else icon="gridicons:fullscreen" class="text-18px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFullscreen } from '@vueuse/core'
import { useThemeStore } from '@/store'

const { theme } = storeToRefs(useThemeStore())

const { isFullscreen, toggle } = useFullscreen()
</script>
