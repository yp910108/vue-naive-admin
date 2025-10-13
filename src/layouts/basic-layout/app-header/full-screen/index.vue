<template>
  <icon-wrap @click="toggle">
    <icon-fullscreen-exit v-if="isFullscreen" />
    <icon-fullscreen v-else />
  </icon-wrap>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { IconWrap } from '@/components'
import { IconFullscreen, IconFullscreenExit } from './icons'

const { isFullscreen, toggle } = useFullscreen()
</script>
