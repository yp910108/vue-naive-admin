<template>
  <router-view #="{ Component, route }">
    <transition
      :name="theme.pageAnimateMode"
      mode="out-in"
      appear
      @before-leave="app.setDisableMainXScroll(true)"
      @after-enter="app.setDisableMainXScroll(false)"
    >
      <keep-alive :include="routeStore.cachedRoutes">
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
import { useAppStore, useRouteStore, useThemeStore } from '@/store'

defineOptions({ name: 'GlobalContent' })

interface Props {
  showPadding?: boolean // 显示 padding
}

withDefaults(defineProps<Props>(), {
  showPadding: true
})

const app = useAppStore()
const theme = useThemeStore()
const routeStore = useRouteStore()
</script>
