<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="$translate('layout.header.fullSreen.tooltip')"
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
import { $translate } from '@/locales'
import { useThemeStore } from '@/store'
import { HoverContainer } from '@/components'
import { IconFullscreen, IconFullscreenExit } from './icons'

const { theme } = storeToRefs(useThemeStore())

const { isFullscreen, toggle } = useFullscreen()
</script>
