import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteData } from '../route'
import type { MenuOption } from './typing'
import { transformMenus, transformSearchMenus } from './util'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<MenuOption[]>([])

  const reset = () => {
    menus.value = []
  }

  const setMenus = (routeData: RouteData[]) => {
    menus.value = transformMenus(routeData)
  }

  // @ts-ignore
  const searchMenus = computed(() => transformSearchMenus(menus.value ?? []))

  return {
    menus,
    reset,
    setMenus,
    searchMenus
  }
})
