declare namespace Settings {
  /**
   * 系统主题
   * - os 跟随系统
   * - light 亮色主题
   * - dark 暗色主题
   */
  type Theme = 'dark' | 'light' | 'os'

  interface Sider {
    /**
     * 侧边栏宽度
     */
    width: number
    /**
     * 侧边栏折叠时的宽度（偏好设置中不会设置此值，此处放入 settings 是为了方便统一管理）
     */
    _collapsedWidth: number
    /**
     * logo 高度
     */
    logoHeight: number
  }

  interface Header {
    /**
     * 头部高度
     */
    height: number
  }

  interface Tab {
    /**
     * 多页签可见
     */
    visible: boolean
    /**
     * 多页签是否缓存
     */
    isCache: boolean
    /**
     * 多页签高度
     */
    height: number
  }

  /**
   * 主题色
   * - default 使用默认主题色
   */
  type PrimaryColor = 'default' | string

  interface Settings {
    /**
     * 系统主题
     */
    theme: Theme
    /**
     * 主题色
     */
    primaryColor: 'default' | string
    /**
     * 侧边栏样式
     */
    sider: Sider
    /**
     * 头部样式
     */
    header: Header
    /**
     * 多页签样式
     */
    tab: Tab
  }
}
