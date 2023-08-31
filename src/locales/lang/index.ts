import { zhCN } from './zh-CN'
import { enUS } from './en-US'

export type Lang = keyof typeof messages

const modules = import.meta.glob('../../**/lang/index.ts', { eager: true })

const messages = { zhCN, enUS }

for (const key in modules) {
  const { zhCN, enUS } = modules[key] as Partial<Record<Lang, object>>
  if (zhCN) {
    messages.zhCN = { ...messages.zhCN, ...zhCN }
  }
  if (enUS) {
    messages.enUS = { ...messages.enUS, ...enUS }
  }
}

export { messages }
