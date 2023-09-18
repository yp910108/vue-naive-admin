import { merge } from 'lodash-es'
import { zhCN } from './zhCN'
import { enUS } from './enUS'

const langs = import.meta.glob('../../**/lang/index.ts', { eager: true })

const messages = { zhCN, enUS }

export type Lang = keyof typeof messages

for (const key in langs) {
  const { zhCN, enUS } = langs[key] as Partial<Record<Lang, object>>
  if (zhCN) {
    messages.zhCN = merge(messages.zhCN, zhCN)
  }
  if (enUS) {
    messages.enUS = merge(messages.enUS, enUS)
  }
}

export { messages }
