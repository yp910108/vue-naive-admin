/**
 * 布局样式
 */
interface Layout {
  /**
   * 最小宽度
   */
  minWidth: number
  /**
   * 布局模式
   */
  mode: UnionKey.ThemeLayoutMode
  /**
   * 布局模式列表
   */
  modeList: Common.OptionWithKey<UnionKey.ThemeLayoutMode>[]
}

/**
 * 其他主题颜色
 */
interface OtherColor {
  /**
   * 信息
   */
  info: string
  /**
   * 成功
   */
  success: string
  /**
   * 警告
   */
  warning: string
  /**
   * 错误
   */
  error: string
}

/**
 * 面包屑样式
 */
interface Crumb {
  /**
   * 面包屑可见
   */
  visible: boolean
  /**
   * 显示图标
   */
  showIcon: boolean
}

// 头部样式
interface Header {
  /**
   * 头部反转色
   */
  inverted: boolean
  /**
   * 头部高度
   */
  height: number
  /**
   * 面包屑样式
   */
  crumb: Crumb
}

/**
 * 多页签样式
 */
export interface Tab {
  /**
   * 多页签可见
   */
  visible: boolean
  /**
   * 多页签高度
   */
  height: number
  /**
   * 多页签风格
   */
  mode: UnionKey.ThemeTabMode
  /**
   * 多页签风格列表
   */
  modeList: Common.OptionWithKey<UnionKey.ThemeTabMode>[]
  /**
   * 开启多页签缓存
   */
  isCache: boolean
}

/**
 * 侧边栏样式
 */
interface Sider {
  /**
   * 侧边栏反转色
   */
  inverted: boolean
  /**
   * 侧边栏宽度
   */
  width: number
  /**
   * 侧边栏折叠时的宽度
   */
  collapsedWidth: number
  /**
   * vertical-mix 模式下侧边栏宽度
   */
  mixWidth: number
  /**
   * vertical-mix 模式下侧边栏折叠时的宽度
   */
  mixCollapsedWidth: number
  /**
   * vertical-mix 模式下侧边栏的子菜单的宽度
   */
  mixChildMenuWidth: number
}

/**
 * 菜单样式
 */
interface Menu {
  /**
   * 水平模式的菜单的位置
   */
  horizontalPosition: UnionKey.ThemeHorizontalMenuPosition
  /**
   * 水平模式的菜单的位置列表
   */
  horizontalPositionList: Common.OptionWithKey<UnionKey.ThemeHorizontalMenuPosition>[]
}

/**
 * 底部样式
 */
interface Footer {
  /**
   * 底部是否可见
   */
  visible: boolean
  /**
   * 是否固定底部
   */
  fixed: boolean
  /**
   * 底部是否居右（顶部混合菜单模式有效）
   */
  right: boolean
  /**
   * 底部高度
   */
  height: number
  /**
   * 底部反转色
   */
  inverted: boolean
}

/**
 * 页面样式
 */
interface Page {
  /**
   * 页面是否开启动画
   */
  animate: boolean
  /**
   * 动画类型
   */
  animateMode: UnionKey.ThemeAnimateMode
  /**
   * 动画类型列表
   */
  animateModeList: Common.OptionWithKey<UnionKey.ThemeAnimateMode>[]
}

export interface Settings {
  /**
   * 暗黑模式
   */
  darkMode: boolean
  /**
   * 是否自动跟随系统主题
   */
  followSystemTheme: boolean
  /**
   * 自定义暗黑动画过渡
   */
  isCustomizeDarkModeTransition: boolean
  /**
   * 布局样式
   */
  layout: Layout
  /**
   * 滚动模式
   */
  scrollMode: UnionKey.ThemeScrollMode
  /**
   * 滚动模式列表
   */
  scrollModeList: Common.OptionWithKey<UnionKey.ThemeScrollMode>[]
  /**
   * 主题颜色
   */
  themeColor: string
  /**
   * 主题颜色列表
   */
  themeColorList: string[]
  /**
   * 其他颜色
   */
  otherColor: OtherColor
  /**
   * 是否自定义 info 的颜色（默认取主题颜色）
   */
  isCustomizeInfoColor: boolean
  /**
   * 固定头部和多页签
   */
  fixedHeaderAndTab: boolean
  /**
   * 显示重载按钮
   */
  showReload: boolean
  /**
   * 头部样式
   */
  header: Header
  /**
   * 多页签样式
   */
  tab: Tab
  /**
   * 侧边栏样式
   */
  sider: Sider
  /**
   * 菜单样式
   */
  menu: Menu
  /**
   * 底部样式
   */
  footer: Footer
  /**
   * 页面样式
   */
  page: Page
}
