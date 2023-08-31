interface Window {
  $dialog: import('naive-ui').DialogProviderInst
  $loadingBar: import('naive-ui').LoadingBarProviderInst
  $message: import('naive-ui').MessageProviderInst
  $notification: import('naive-ui').NotificationProviderInst
  $translate: typeof import('../locales').$translate
}

declare const $translate: typeof import('../locales').$translate

interface ViewTransition {
  ready: Promise<void>
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}

/**
 * vue 的 defineExpose 导出的类型
 */
declare namespace Expose {
  interface BetterScroll {
    instance: import('@better-scroll/core').BScrollInstance
  }
}

declare namespace NaiveUI {
  type ThemeColor = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
}
