declare namespace Settings {
  /**
   * 系统主题
   * - dark 暗色
   * - light 亮色
   * - os 跟随系统
   */
  type Theme = 'dark' | 'light' | 'os'

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
     * 开启多页签缓存
     */
    isCache: boolean
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
     * 多页签样式
     */
    tab: Tab
  }
}
