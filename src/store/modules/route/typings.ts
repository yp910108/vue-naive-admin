/**
 * 路由需要的 layout 类型
 * - blank 空白布局
 * - basic 基础布局（含左侧菜单）
 */
type LayoutType = 'blank' | 'basic'

/**
 * 路由数据格式
 */
export interface RouteData {
  /**
   * 路由/菜单/面包屑/document.title 标题
   */
  title: string
  /**
   * 路由路径，对应 views 下面的文件夹名称（不需要添加 /，嵌套路由不需要拼接父级文件夹名称）
   */
  path: string
  /**
   * 图标名称
   */
  icon?: string
  /**
   * 路由需要的 layout 类型，取值 blank | basic。默认为 basic
   */
  layout?: LayoutType
  /**
   * 是否白名单。默认 false，当设置为 true 时，不需要登录校验
   */
  white?: boolean
  /**
   * 是否缓存路由对应的页面组件。默认 false，当设置为 true 时，缓存路由对应的页面组件
   */
  keepAlive?: boolean
  /**
   * 当前路由需要选中的菜单（需要填写对应路由的完整路径或者 name，最终都会被转化为对应路由的 name）
   */
  activeMenu?: string
  /**
   * 是否可以用作根路由。默认为 false，当设置为 true 时，无法用作根路由（默认会将 basicLayoutRoute 中的
   * 第一个路由作为根路由，如果将此选项设置为 true，则此路由即便是第一个也无法用作根路由）
   */
  unsafeRoot?: boolean
  /**
   * 路由的重定向地址（默认会跳转到第一个子路由，需要填写自身的完整路径和子路由的路径）
   */
  redirect?: string
  /**
   * 子路由
   */
  children?: RouteData[]
}
