<template>
  <icon-wrap @click="appStore.toggleSiderCollapse">
    <icon-fold-right v-if="appStore.siderCollapse" />
    <icon-fold-left v-else />
  </icon-wrap>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { IconWrap } from '@/components'
import { IconFoldLeft, IconFoldRight } from './icons'

const appStore = useAppStore()
</script>
