<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive :include="cacheStore.caches">
        <component
          :is="Component"
          :key="route.fullPath"
          :class="['grow-1', contentClass]"
          :style="contentStyle"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useCacheStore } from '@/store'

defineProps<{
  contentClass?: string
  contentStyle?: CSSProperties | string
}>()

const cacheStore = useCacheStore()
</script>
