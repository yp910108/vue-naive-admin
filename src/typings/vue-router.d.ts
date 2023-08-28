import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta
    extends Omit<import('../router').Route, 'path' | 'layout' | 'redirect' | 'children'> {}
}
