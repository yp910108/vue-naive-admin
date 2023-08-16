<template>
  <div class="flex-1-hidden h-full px-10px">
    <n-scrollbar :x-scrollable="true" class="flex-1-hidden h-full" content-class="h-full">
      <div class="flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
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
import { useMenuStore, useThemeStore } from '@/store'

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const menuStore = useMenuStore()
const { theme } = storeToRefs(themeStore)

const activeKey = computed(() => route.name as string)

const handleUpdateMenu = (key: string) => {
  router.push({ name: key })
}
</script>

<style scoped lang="scss">
:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
</style>
