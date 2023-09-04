import type { Settings } from '@/settings'

export type TabMode = Settings['tab']['mode']

export interface Props {
  mode?: TabMode
  darkMode?: boolean
  icon?: Icon.IconName
  title?: string
  active?: boolean
  closeable?: boolean
}

export type TabProps = Omit<Props, 'mode'>

export interface Emits {
  (e: 'close'): void
}
