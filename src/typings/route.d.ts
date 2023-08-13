declare namespace AuthRoute {
  type LayoutType = 'blank' | 'basic'

  type Route = {
    title: string
    path?: string
    redirect?: string
    icon?: Icon.IconName
    hide?: boolean
    white?: boolean
    keepAlive?: boolean
    multiTab?: boolean
    order?: number
    affix?: boolean
    href?: string
    layout?: LayoutType
    children?: Route[]
  }

  type RouteModule = Record<string, { default: Route }>
}
