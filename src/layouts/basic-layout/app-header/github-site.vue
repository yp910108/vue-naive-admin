<template>
  <hover-container
    tooltip-content="github"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="handleClickLink"
  >
    <icon-github class="text-20px" />
  </hover-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const handleClickLink = () => {
  window.open('https://github.com/honghuangdc/soybean-admin', '_blank')
}
</script>
