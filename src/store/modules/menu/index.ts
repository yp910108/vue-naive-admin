import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { transformMenus, transformSearchMenus } from './utils'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<Menu.MenuOption[]>([])

  const setMenus = (routeData: Route.RouteData[]) => {
    menus.value = transformMenus(routeData)
  }

  // @ts-ignore
  const searchMenus = computed(() => transformSearchMenus(menus.value))

  const reset = () => {
    menus.value = []
  }

  return { menus, setMenus, searchMenus, reset }
})
