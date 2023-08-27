import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: import('../locales/typing').T
  }
}
