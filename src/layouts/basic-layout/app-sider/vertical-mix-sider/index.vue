<template>
  <dark-mode-container
    class="flex h-full"
    :inverted="theme.sider.inverted"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex-1-hidden flex-col-stretch h-full">
      <logo :style="{ height: `${theme.header.height}px` }" />
      <n-scrollbar class="flex-1-hidden">
        <mix-menu-item
          v-for="menu of menuStore.menus"
          :key="menu.key"
          :item="menu"
          :active-key="activeKey"
          :is-mini="appStore.siderCollapse"
          @change="handleMixMenuChange"
        />
      </n-scrollbar>
      <mix-menu-collapse />
    </div>
    <mix-menu-drawer ref="mixMenuDrawerRef" />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, useMenuStore, useThemeStore } from '@/store'
import Logo from '../../components/logo.vue'
import MixMenuItem from './mix-menu-item.vue'
import MixMenuDrawer from './mix-menu-drawer.vue'
import MixMenuCollapse from './mix-menu-collapse.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const themeStore = useThemeStore()
const menuStore = useMenuStore()
const { theme } = storeToRefs(themeStore)

const activeKey = ref<string>()

const mixMenuDrawerRef = ref<InstanceType<typeof MixMenuDrawer>>()

const handleMixMenuChange = ({ key, children }: App.GlobalMenuOption) => {
  activeKey.value = key
  if (children && children.length) {
    mixMenuDrawerRef.value?.show(children)
  } else {
    router.push({ name: key })
  }
}

const setActiveKeyByRoute = () => {
  const routeName = (route.meta.activeMenu ?? route.name) as string
  for (const { key, children } of menuStore.menus ?? []) {
    if (routeName.includes(key)) {
      activeKey.value = key
      if (children && children.length) {
        mixMenuDrawerRef.value?.setMenus(children)
        mixMenuDrawerRef.value?.setExpandKeys(children)
      } else {
        mixMenuDrawerRef.value?.setMenus([])
      }
      break
    }
  }
}

const handleMouseLeave = () => {
  mixMenuDrawerRef.value?.hide()
  setActiveKeyByRoute()
}

watch(() => route.name, setActiveKeyByRoute, { immediate: true })
</script>
