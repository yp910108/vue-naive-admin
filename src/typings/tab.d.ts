declare namespace Tab {
  type MultiTab = {
    key: string
    title: string
    routePath: string
    icon?: string
    scrollPosition: {
      left: number
      top: number
    }
  }
}
