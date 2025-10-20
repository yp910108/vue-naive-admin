<template>
  <icon-wrap @click="appStore.toggleSiderCollapse">
    <icon-fold v-if="appStore.siderCollapse" />
    <icon-unfold v-else />
  </icon-wrap>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { IconWrap } from '@/components'
import { IconFold, IconUnfold } from './icons'

const appStore = useAppStore()
</script>
