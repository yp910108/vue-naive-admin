import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Route } from '@/router'
import type { MenuOption } from './typing'
import { transformMenus, transformSearchMenus } from './helper'

export const useMenuStore = defineStore('menu-store', () => {
  const menus = ref<MenuOption[]>()

  const reset = () => {
    menus.value = []
  }

  const setMenus = (authRoutes: Route[]) => {
    menus.value = transformMenus(authRoutes)
  }

  const searchMenus = computed(() => transformSearchMenus(menus.value ?? []))

  return {
    menus,
    reset,
    setMenus,
    searchMenus
  }
})
