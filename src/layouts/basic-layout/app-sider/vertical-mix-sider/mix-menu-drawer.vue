<template>
  <div
    class="relative h-full transition-width duration-300 ease-in-out"
    :style="{ width: appStore.mixSiderFixed ? `${theme.sider.mixChildMenuWidth}px` : '0px' }"
  >
    <dark-mode-container
      class="drawer-shadow absolute-lt flex-col-stretch h-full nowrap-hidden"
      :inverted="theme.sider.inverted"
      :style="{
        width: visible || appStore.mixSiderFixed ? `${theme.sider.mixChildMenuWidth}px` : '0px'
      }"
    >
      <header
        class="header-height flex-y-center justify-between"
        :style="{ height: `${theme.header.height}px` }"
      >
        <h2 class="text-primary pl-8px text-16px font-bold">{{ $translate('system.title') }}</h2>
        <div
          class="px-8px text-16px text-gray-600 cursor-pointer"
          @click="appStore.toggleMixSiderFixed"
        >
          <icon-pin-off v-if="appStore.mixSiderFixed" />
          <icon-pin v-else />
        </div>
      </header>
      <n-scrollbar class="flex-1-hidden">
        <n-menu
          :value="activeKey"
          :options="menus"
          :expanded-keys="expandedKeys"
          @update:value="handleUpdateMenu"
          @update:expanded-keys="handleUpdateExpandedKeys"
        />
      </n-scrollbar>
    </dark-mode-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'
import { useBoolean } from '@/hooks'
import { getActiveKeyPathsOfMenus } from '@/utils'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const { bool: visible, setTrue, setFalse } = useBoolean()
const menus = ref<App.GlobalMenuOption[]>()

const activeKey = computed(() => route.name as string)
const expandedKeys = ref<string[]>()

const handleUpdateMenu = (key: string) => {
  router.push({ name: key })
}

const handleUpdateExpandedKeys = (keys: string[]) => {
  expandedKeys.value = keys
}

const show = (_menus: App.GlobalMenuOption[]) => {
  menus.value = _menus
  expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, _menus)
  setTrue()
}

const hide = () => {
  setFalse()
  setTimeout(() => {
    if (!appStore.mixSiderFixed) {
      menus.value = undefined
    }
  }, 300)
}

defineExpose({ show, hide })
</script>

<style scoped lang="scss">
.drawer-shadow {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
