declare namespace AuthRoute {
  type LayoutType = 'blank' | 'basic'

  type Route = {
    title: string
    path: string
    icon?: Icon.IconName
    white?: boolean
    keepAlive?: boolean
    multiTab?: boolean
    order?: number
    affix?: boolean
    href?: string
    layout?: LayoutType
    redirect?: string
    children?: Route[]
  } & Omit<import('vue-router').RouteRecordRaw, 'path' | 'redirect' | 'children'>

  type RouteModule = Record<string, { default: Route }>
}
