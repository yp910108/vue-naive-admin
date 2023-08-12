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
  type StrategyAction = [boolean, () => void] // 策略模式 [true, 为 true 时执行的回调函数]

  type OptionWithKey<K> = { value: K; label: string }
}
