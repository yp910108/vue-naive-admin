import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta
    extends Omit<import('../store').Route, 'path' | 'layout' | 'redirect' | 'children'> {}
}
