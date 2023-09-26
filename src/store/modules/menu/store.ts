import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteData } from '../route'
import type { MenuOption } from './typings'
import { transformMenus, transformSearchMenus } from './utils'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<MenuOption[]>([])

  const reset = () => {
    menus.value = []
  }

  const setMenus = (routeData: RouteData[]) => {
    // @ts-ignore
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
