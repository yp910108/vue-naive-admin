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
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { useLoading } from '@/hooks'

const route = useRoute()
const appStore = useAppStore()
const { loading, startLoading, endLoading } = useLoading()

const handleRefresh = () => {
  const key = route.name as string
  startLoading()
  appStore.reloadPage(key)
  setTimeout(() => {
    endLoading()
  }, 1000)
}
</script>
