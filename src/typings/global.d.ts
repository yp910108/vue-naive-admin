interface Window {
  $dialog?: import('naive-ui').DialogProviderInst
  $loadingBar?: import('naive-ui').LoadingBarProviderInst
  $message?: import('naive-ui').MessageProviderInst
  $notification?: import('naive-ui').NotificationProviderInst
}

interface ViewTransition {
  ready: Promise<void>
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}

declare namespace Common {
  type OptionWithKey<K> = { value: K; label: string }
}

declare namespace Auth {
  /**
   * 用户角色类型（前端静态路由用角色类型进行路由权限的控制）
   * - super: 超级管理员(该权限具有所有路由数据)
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = 'super' | 'admin' | 'user'

  /**
   * 用户信息
   */
  interface UserInfo {
    userId: string
    userName: string
    userRole: RoleType
  }
}

declare namespace App {
  /**
   * 菜单
   */
  type MenuOption = import('naive-ui').MenuOption & {
    key: string
    label: string
    routePath: string
    icon?: () => import('vue').Component
    children?: MenuOption[]
  }

  /**
   * 面包屑
   */
  type Breadcrumb = MenuOption

  /**
   * 搜索菜单
   */
  type SearchMenu = {
    key: string
    label: string
    routePath: string
    icon?: () => import('vue').Component
  }

  /**
   * 多页签 Tab 的路由
   */
  type GlobalTab = {
    key: string
    title: string
    routePath: string
    icon?: Icon.IconName
    scrollPosition: {
      left: number
      top: number
    }
  }
}
