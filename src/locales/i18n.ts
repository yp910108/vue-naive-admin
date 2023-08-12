import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import type { TranslateOptions } from 'vue-i18n'
import { localStg } from '../utils/storage'
import messages from './lang'

const i18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
})

export function setupI18n(app: App) {
  app.use(i18n)
}

interface T {
  (key: I18nType.I18nKey): string
  (
    key: I18nType.I18nKey,
    named: Record<string, unknown>,
    options?: TranslateOptions<I18nType.Lang>
  ): string
}

export const $t = i18n.global.t as T

export function setLocale(locale: I18nType.Lang) {
  i18n.global.locale.value = locale
}
