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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { HoverContainer } from '@/components'
import IconRefresh from './icon-refresh.vue'

const route = useRoute()
const appStore = useAppStore()
const loading = ref(false)

const handleRefresh = () => {
  const key = route.name as string
  loading.value = true
  appStore.reloadPage(key)
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>
