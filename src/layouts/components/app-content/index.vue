<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive :include="cacheStore.caches">
        <component
          v-if="appStore.reloadFlag"
          :is="Component"
          :key="route.fullPath"
          :class="['grow-1 bg-#f6f9f8', contentClass]"
          :style="contentStyle"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useAppStore, useCacheStore } from '@/store'

defineProps<{
  contentClass?: string
  contentStyle?: CSSProperties | string
}>()

const appStore = useAppStore()

const cacheStore = useCacheStore()
</script>
