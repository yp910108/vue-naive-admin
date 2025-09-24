import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { localStg } from '@/utils'
import { messages } from './lang'

const locale: Lang.Type = localStg.get('lang') ?? 'zhCN'

const fallbackLocale: Lang.Type = 'enUS'

const i18n = createI18n({
  locale,
  fallbackLocale,
  messages: { ...messages },
  legacy: false
})

export const setupI18n = (app: App) => {
  app.use(i18n)
}

export const $translate = i18n.global.t

export const setLocale = (locale: Lang.Type) => {
  i18n.global.locale.value = locale
}
