/**
 * 布局模式
 * - vertical 左侧菜单模式
 * - horizontal 顶部菜单模式
 * - vertical-mix 左侧菜单混合模式
 * - horizontal-mix 顶部菜单混合模式
 */
type LayoutMode = 'vertical' | 'horizontal' | 'vertical-mix' | 'horizontal-mix'

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
  mode: LayoutMode
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
 * 多页签风格
 * - chrome 谷歌风格
 * - button 按钮风格
 */
type TabMode = 'chrome' | 'button'

/**
 * 多页签样式
 */
interface Tab {
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
  mode: TabMode
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
 * 水平模式的菜单位置
 * - flex-start 居左
 * - center 居中
 * - flex-end 居右
 */
type HorizontalMenuPosition = 'flex-start' | 'center' | 'flex-end'

/**
 * 菜单样式
 */
interface Menu {
  /**
   * 水平模式的菜单的位置
   */
  horizontalPosition: HorizontalMenuPosition
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
   * 底部高度
   */
  height: number
  /**
   * 底部反转色
   */
  inverted: boolean
}

/**
 * 过渡动画类型
 * - fade-slide: 滑动
 * - fade: 消退
 * - fade-bottom: 底部消退
 * - fade-scale: 缩放消退
 * - zoom-fade: 渐变
 * - zoom-out: 闪现
 */
type PageAnimateMode =
  | 'fade-slide'
  | 'fade'
  | 'fade-bottom'
  | 'fade-scale'
  | 'zoom-fade'
  | 'zoom-out'

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
  animateMode: PageAnimateMode
}

/**
 * 内容溢出时的出现滚动条的方式
 * - wrapper 布局组件最外层的元素出现滚动条
 * - content 主体内容组件出现滚动条
 */
type ScrollMode = 'wrapper' | 'content'

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
   * 布局样式
   */
  layout: Layout
  /**
   * 滚动模式
   */
  scrollMode: ScrollMode
  /**
   * 主颜色
   */
  primaryColor: string
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
