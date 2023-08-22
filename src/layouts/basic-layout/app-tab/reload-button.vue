<template>
  <hover-container
    tooltip-content="重新加载"
    placement="bottom-end"
    class="w-64px h-full"
    @click="handleRefresh"
  >
    <icon-refresh :class="['text-22px', { 'animate-spin': loading }]" />
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { useLoading } from '@/hooks'

const appStore = useAppStore()
const { loading, startLoading, endLoading } = useLoading()

const handleRefresh = () => {
  startLoading()
  appStore.reloadPage()
  setTimeout(() => {
    endLoading()
  }, 1000)
}
</script>
