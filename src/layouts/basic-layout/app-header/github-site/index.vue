<template>
  <hover-container
    class="w-40px h-full"
    :tooltip-content="$translate('layout.header.githubSite.tooltip')"
    :inverted="theme.header.inverted"
    @click="handleClickLink"
  >
    <icon-github class="text-20px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { HoverContainer } from '@/components'
import IconGithub from './icon-github.vue'

const { theme } = storeToRefs(useThemeStore())

const handleClickLink = () => {
  window.open('https://github.com/yp910108/vue-naive-admin', '_blank')
}
</script>
