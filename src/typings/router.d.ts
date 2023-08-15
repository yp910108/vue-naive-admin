import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta extends Omit<AuthRoute.Route, 'path' | 'layout' | 'redirect' | 'children'> {}
}
