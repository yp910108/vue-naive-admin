<template>
  <router-view v-slot="{ Component, route }">
    <transition
      mode="out-in"
      appear
      :name="themeStore.pageAnimateMode"
      @before-leave="appStore.setDisableMainXScroll(true)"
      @after-enter="appStore.setDisableMainXScroll(false)"
    >
      <keep-alive :include="cacheStore.caches">
        <component
          v-if="appStore.reloadFlag"
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

const appStore = useAppStore()
const themeStore = useThemeStore()
const cacheStore = useCacheStore()
</script>
