import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta
    extends Omit<import('../store').RouteData, 'path' | 'layout' | 'redirect' | 'children'> {}
}
