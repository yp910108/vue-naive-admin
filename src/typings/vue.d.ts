import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: import('../locales').T
  }
}
