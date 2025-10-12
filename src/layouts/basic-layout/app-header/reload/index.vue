<template>
  <icon-wrap @click="handleReload">
    <icon-reload :class="{ 'animate-spin': loading }" />
  </icon-wrap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { IconWrap } from '@/components'
import { IconReload } from './icons'

const route = useRoute()

const appStore = useAppStore()

const loading = ref(false)

const handleReload = () => {
  const key = route.name as string
  loading.value = true
  appStore.reloadPage(key)
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>
