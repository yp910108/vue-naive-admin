<template>
  <div>
    this is analysis.
    <n-input />
    {{ cacheStore.caches }}
  </div>
</template>

<script setup lang="ts">
import { useCacheStore } from '@/store'

const cacheStore = useCacheStore()
</script>
