<template>
  <router-view v-slot="{ Component, route }">
    <transition
      mode="out-in"
      appear
      :name="themeStore.pageAnimateMode"
      @before-leave="app.setDisableMainXScroll(true)"
      @after-enter="app.setDisableMainXScroll(false)"
    >
      <keep-alive :include="cacheStore.caches">
        <component
          v-if="app.reloadFlag"
          :is="Component"
          :key="route.fullPath"
          :class="[
            'flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out',
            { 'p-16px': showPadding }
          ]"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useAppStore, useCacheStore, useThemeStore } from '@/store'

defineOptions({ name: 'AppContent' })

interface Props {
  /**
   * 显示padding
   */
  showPadding?: boolean
}

withDefaults(defineProps<Props>(), {
  showPadding: true
})

const app = useAppStore()
const themeStore = useThemeStore()
const cacheStore = useCacheStore()
</script>
