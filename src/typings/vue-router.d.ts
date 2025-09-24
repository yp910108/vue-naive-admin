import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends Omit<Route.RouteData, 'path' | 'layout' | 'redirect' | 'children'> {}
}
