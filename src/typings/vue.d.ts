import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: I18nType.T
  }
}
