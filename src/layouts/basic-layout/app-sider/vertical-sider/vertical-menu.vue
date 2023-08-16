<template>
  <n-scrollbar class="flex-1-hidden">
    <n-menu
      :value="activeKey"
      :options="menuStore.menus"
      :collapsed="appStore.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="22"
      :expanded-keys="expandedKeys"
      :indent="18"
      :inverted="!theme.darkMode && theme.sider.inverted"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, useMenuStore, useThemeStore } from '@/store'
import { getActiveKeyPathsOfMenus } from '@/utils'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const themeStore = useThemeStore()
const menuStore = useMenuStore()
const { theme } = storeToRefs(themeStore)

const activeKey = computed(() => route.name as string)
const expandedKeys = ref<string[]>()

const handleUpdateMenu = (key: string) => {
  router.push({ name: key })
}

const handleUpdateExpandedKeys = (keys: string[]) => {
  expandedKeys.value = keys
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menuStore.menus ?? [])
  }
)
</script>
