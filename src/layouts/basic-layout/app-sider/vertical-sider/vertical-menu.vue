<template>
  <n-scrollbar class="flex-1-hidden">
    <n-menu
      :value="activeKey"
      :options="routeStore.menus"
      :collapsed="appStore.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :expanded-keys="expandedKeys"
      :indent="18"
      :inverted="!theme.darkMode && theme.sider.inverted"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useRouteStore, useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const activeKey = computed(() => route.name as string)
const expandedKeys = ref<string[]>()

const handleUpdateExpandedKeys = (keys: string[]) => {
  expandedKeys.value = keys
}

watch(
  () => route.name,
  () => {
    // expandedKeys.value
  }
)
</script>
