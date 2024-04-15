<template>
  <div
    class="relative h-full transition-width duration-300 ease-in-out"
    :style="{
      '--primary-color': themeVars.primaryColor,
      width: appStore.mixSiderFixed ? `${theme.sider.mixChildMenuWidth}px` : '0px'
    }"
  >
    <dark-mode-container
      class="drawer-shadow absolute left-0 top-0 flex flex-col items-stretch h-full whitespace-nowrap overflow-hidden"
      :inverted="theme.sider.inverted"
      :style="{
        width: visible || appStore.mixSiderFixed ? `${theme.sider.mixChildMenuWidth}px` : '0px'
      }"
    >
      <header
        class="flex justify-between items-center"
        :style="{ height: `${theme.header.height}px` }"
      >
        <h2 class="text-[var(--primary-color)] pl-8px text-16px font-bold">
          {{ $translate('system.title') }}
        </h2>
        <div
          class="px-8px text-16px text-gray-600 cursor-pointer"
          @click="appStore.toggleMixSiderFixed"
        >
          <icon-pin-off v-if="appStore.mixSiderFixed" />
          <icon-pin v-else />
        </div>
      </header>
      <n-scrollbar class="flex-1 overflow-hidden">
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
import { useThemeVars, type MenuOption as NaiveMenuOption } from 'naive-ui'
import { isExternal } from '@/utils'
import { useAppStore, useThemeStore, type MenuOption } from '@/store'
import { DarkModeContainer } from '@/components'
import { getActiveKeyPathsOfMenus } from '../../hepler'
import IconPinOff from './icon-pin-off.vue'
import IconPin from './icon-pin.vue'

const themeVars = useThemeVars()

const route = useRoute()

const router = useRouter()

const appStore = useAppStore()

const { theme } = storeToRefs(useThemeStore())

const visible = ref(false)

const menus = ref<MenuOption[]>()

const setMenus = (_menus: MenuOption[]) => {
  menus.value = _menus
}

const activeKey = computed(() => (route.meta.activeMenu ?? route.name) as string)

const expandedKeys = ref<string[]>()

const setExpandKeys = (menus: MenuOption[]) => {
  expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus)
}

const handleUpdateMenu = (key: string, item: NaiveMenuOption) => {
  const { routePath } = item as MenuOption
  if (isExternal(routePath)) {
    window.open(routePath, '_blank')
  } else {
    router.push({ name: key })
  }
}

const handleUpdateExpandedKeys = (keys: string[]) => {
  expandedKeys.value = keys
}

const show = (menus: MenuOption[]) => {
  setMenus(menus)
  setExpandKeys(menus)
  visible.value = true
}

const hide = () => {
  visible.value = false
  setTimeout(() => {
    if (!appStore.mixSiderFixed) {
      menus.value = undefined
    }
  }, 300)
}

defineExpose({ show, hide, setMenus, setExpandKeys })
</script>

<style scoped lang="scss">
.drawer-shadow {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
