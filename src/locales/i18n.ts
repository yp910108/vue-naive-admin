import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { localStg } from '@/utils'
import type { Lang } from './typing'
import messages from './lang'

const i18n = createI18n({
  locale: localStg.get('lang') ?? 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export function setupI18n(app: App) {
  app.use(i18n)
  app.config.globalProperties.$translate = i18n.global.t
}

export const $translate = i18n.global.t

export function setLocale(locale: Lang) {
  i18n.global.locale.value = locale
}
