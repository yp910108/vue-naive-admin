import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { transformAuthRoutesToMenus, transformAuthRoutesToSearchMenus } from '@/utils'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<App.GlobalMenuOption[]>()

  const reset = () => {
    menus.value = []
  }

  const setMenus = (authRoutes: AuthRoute.Route[]) => {
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
