declare namespace Menu {
  type MenuOption = import('naive-ui').MenuOption & {
    key: string
    label: string
    routePath: string
    icon?: () => import('vue').Component
    children?: MenuOption[]
  }

  type SearchMenuOption = {
    key: string
    label: string
    routePath: string
    icon?: () => import('vue').Component
  }
}
