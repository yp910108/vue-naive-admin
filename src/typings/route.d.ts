declare namespace AuthRoute {
  type LayoutType = 'blank' | 'basic'

  type Route = {
    title: string
    path: string
    icon?: Icon.IconName
    activeMenu?: string
    white?: boolean
    keepAlive?: boolean
    layout?: LayoutType
    redirect?: string
    children?: Route[]
  } & Omit<import('vue-router').RouteRecordRaw, 'path' | 'redirect' | 'children'>

  type RouteModule = Record<string, { default: Route }>
}
