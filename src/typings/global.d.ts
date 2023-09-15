declare module 'virtual:svg-icons-names' {
  const ids: string[]
  export default ids
}

interface Window {
  $dialog: import('naive-ui').DialogProviderInst
  $loadingBar: import('naive-ui').LoadingBarProviderInst
  $message: import('naive-ui').MessageProviderInst
  $notification: import('naive-ui').NotificationProviderInst
  $translate: typeof import('../locales').$translate
}

declare const $translate: typeof import('../locales').$translate
