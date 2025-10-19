<template>
  <n-scrollbar>
    <n-menu
      :value="active"
      :options="menuStore.menus"
      :collapsed="!appStore.isMobile && appStore.siderCollapse"
      :collapsed-width="SIDER_COLLAPSED_WIDTH"
      :collapsed-icon-size="22"
      :expanded-keys="expandedKeys"
      :indent="18"
      @update:value="handleUpdateActive"
      @update:expanded-keys="handleUpdateExpandedKeys"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { isExternal } from '@/utils'
import { useAppStore, useMenuStore } from '@/store'
import { SIDER_COLLAPSED_WIDTH } from '../../constants'
import { getActiveKeys } from './utils'

const appStore = useAppStore()

const menuStore = useMenuStore()

const route = useRoute()

const active = computed(() => (route.meta.activeMenu ?? route.name) as string)

const router = useRouter()

const handleUpdateActive = (newVal: string, newItem: MenuOption) => {
  const { routePath } = newItem as Menu.MenuOption
  if (isExternal(routePath)) {
    window.open(routePath, '_blank')
  } else {
    router.push({ name: newVal })
  }
}

const expandedKeys = ref<string[]>()

const handleUpdateExpandedKeys = (keys: string[]) => {
  expandedKeys.value = keys
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeys(active.value, menuStore.menus)
  }
)
</script>
