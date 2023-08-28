import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { transformAuthRoutesToMenus, transformAuthRoutesToSearchMenus } from '@/utils'
import type { Route } from '@/router'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<App.MenuOption[]>()

  const reset = () => {
    menus.value = []
  }

  const setMenus = (authRoutes: Route[]) => {
    menus.value = transformAuthRoutesToMenus(authRoutes)
  }

  const searchMenus = computed(() => transformAuthRoutesToSearchMenus(menus.value ?? []))

  return {
    menus,
    reset,
    setMenus,
    searchMenus
  }
})
