<template>
  <div class="flex-1 overflow-hidden h-full px-10px">
    <n-scrollbar :x-scrollable="true" class="flex-1 overflow-hidden h-full" content-class="h-full">
      <div
        class="flex items-center h-full"
        :style="{ justifyContent: theme.menu.horizontalPosition }"
      >
        <n-menu
          :value="activeKey"
          :options="menuStore.menus"
          :inverted="theme.header.inverted"
          mode="horizontal"
          @update:value="handleUpdateMenu"
        />
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { MenuOption as NaiveMenuOption } from 'naive-ui'
import { isExternal } from '@/utils'
import { useMenuStore, useThemeStore, type MenuOption } from '@/store'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const { theme } = storeToRefs(useThemeStore())

const activeKey = computed(() => (route.meta.activeMenu ?? route.name) as string)

const handleUpdateMenu = (key: string, item: NaiveMenuOption) => {
  const { routePath } = item as MenuOption
  if (isExternal(routePath)) {
    window.open(routePath, '_blank')
  } else {
    router.push({ name: key })
  }
}
</script>

<style scoped lang="scss">
:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
</style>
