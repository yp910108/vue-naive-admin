/**
 * 路由需要的 layout 类型
 * - blank 空白布局
 * - basic 基础布局（含左侧菜单）
 */
type LayoutType = 'blank' | 'basic'

export type Route = {
  /**
   * 路由/菜单/面包屑/document.title 标题
   */
  title: string
  /**
   * 路由路径，对应 views 下面的文件夹名称，嵌套路由不需要拼接父级文件夹名称（当路由不需要展示在菜单中时，需要填写完整路径）
   */
  path: string
  /**
   * 图标名称
   */
  icon?: Icon.IconName
  /**
   * 当前路由需要选中的菜单（需要填写完整路径）
   */
  activeMenu?: string
  /**
   * 是否白名单。默认 false，当设置为 true 时，不需要登录校验
   */
  white?: boolean
  /**
   * 是否在菜单中隐藏。默认 false，当设置为 true 时，在菜单中隐藏
   */
  hide?: boolean
  /**
   * 是否缓存路由对应的页面组件。默认 false，当设置为 true 时，缓存路由对应的页面组件
   */
  keepAlive?: boolean
  /**
   * 路由需要的 layout 类型，取值 blank | basic。默认为 basic
   */
  layout?: LayoutType
  /**
   * 路由的重定向地址（需要填写自身的完整路径和子路由的路径）
   */
  redirect?: string
  /**
   * 子路由
   */
  children?: Route[]
} & Omit<import('vue-router').RouteRecordRaw, 'path' | 'redirect' | 'children'>
