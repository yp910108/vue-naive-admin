import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { localStg } from '@/utils'
import messages from './lang'

const i18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export function setupI18n(app: App) {
  app.use(i18n)
  app.config.globalProperties.$translate = i18n.global.t
}

export const $t = i18n.global.t

export function setLocale(locale: I18nType.Lang) {
  i18n.global.locale.value = locale
}
