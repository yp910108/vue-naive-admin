interface Window {
  $dialog?: import('naive-ui').DialogProviderInst
  $loadingBar?: import('naive-ui').LoadingBarProviderInst
  $message?: import('naive-ui').MessageProviderInst
  $notification?: import('naive-ui').NotificationProviderInst
}

interface ViewTransition {
  ready: Promise<void>
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}

declare namespace Common {
  type OptionWithKey<K> = { value: K; label: string }
}
