declare namespace Tab {
  type TabItem = {
    key: string
    title: string
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
