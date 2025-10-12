<template>
  <icon-wrap @click="appStore.toggleSiderCollapse">
    <icon-layout />
  </icon-wrap>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { IconWrap } from '@/components'
import { IconLayout } from './icons'

const appStore = useAppStore()
</script>
