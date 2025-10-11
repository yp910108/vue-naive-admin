declare namespace Tab {
  type TabItem = {
    key: string
    title: string
    /**
     * 是否缓存 tab 对应的页面组件。默认 false，当进行二级页面跳转时会设置为 true（用于临时缓存当前 tab 对应的页面组件）
     */
    cache?: boolean
    routePath: string
    backRoutePath?: string
    icon?: string
    scrollPosition: {
      left: number
      top: number
    }
  }
}
