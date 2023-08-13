import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta
    extends Exclude<AuthRoute.Route, 'path' | 'redirect' | 'layout' | 'children'> {}
}
