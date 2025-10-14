<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive :include="cacheStore.caches">
        <component
          v-if="appStore.reloadFlag"
          :is="Component"
          :key="route.fullPath"
          class="bg-#f6f9f8"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useAppStore, useCacheStore } from '@/store'

const appStore = useAppStore()

const cacheStore = useCacheStore()
</script>
