import { ref } from 'vue'
import { defineStore } from 'pinia'
import { transformAuthRoutesToMenus } from '@/utils'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<App.GlobalMenuOption[]>()

  const reset = () => {
    menus.value = []
  }

  const setMenus = (authRoutes: AuthRoute.Route[]) => {
    menus.value = transformAuthRoutesToMenus(authRoutes)
  }

  return {
    menus,
    reset,
    setMenus
  }
})
