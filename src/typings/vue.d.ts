import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: typeof import('../locales').$translate
  }
}
