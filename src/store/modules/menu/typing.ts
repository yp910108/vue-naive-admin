/**
 * 菜单
 */
export type MenuOption = import('naive-ui').MenuOption & {
  key: string
  label: string
  routePath: string
  icon?: () => import('vue').Component
  children?: MenuOption[]
}

/**
 * 搜索菜单
 */
export type SearchMenuOption = {
  key: string
  label: string
  routePath: string
  icon?: () => import('vue').Component
}
