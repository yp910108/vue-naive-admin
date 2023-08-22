declare namespace AuthRoute {
  type LayoutType = 'blank' | 'basic'

  type Route = {
    title: string
    path: string
    icon?: Icon.IconName
    white?: boolean
    keepAlive?: boolean
    order?: number
    href?: string
    layout?: LayoutType
    redirect?: string
    children?: Route[]
  } & Omit<import('vue-router').RouteRecordRaw, 'path' | 'redirect' | 'children'>

  type RouteModule = Record<string, { default: Route }>
}
