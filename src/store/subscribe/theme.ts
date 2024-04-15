import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOsTheme } from 'naive-ui'
import { useEventListener } from '@vueuse/core'
import { localStg, sessionStg } from '@/utils'
import { useThemeStore } from '../modules'

const DARK_CLASS = 'dark'

/**
 * 将 dark 类名添加到 document.documentELement
 */
const addDarkClassToDocument = () => {
  document.documentElement.classList.add(DARK_CLASS)
}

/**
 * 将 dark 类名从 document.documentELement 移除
 */
const removeDarkClassFromDocument = () => {
  document.documentElement.classList.remove(DARK_CLASS)
}

export default function subscribeThemeStore() {
  const themeStore = useThemeStore()

  const { theme } = storeToRefs(themeStore)

  const osTheme = useOsTheme()

  watch(
    osTheme,
    (newVal) => {
      const isDark = newVal === 'dark'
      if (!localStg.get('theme') && theme.value.followSystemTheme) {
        themeStore.setDarkMode(isDark)
      }
    },
    { immediate: true }
  )

  watch(
    () => theme.value.darkMode,
    (newDarkMode) => {
      if (newDarkMode) {
        addDarkClassToDocument()
      } else {
        removeDarkClassFromDocument()
      }
    },
    { immediate: true }
  )

  useEventListener(window, 'beforeunload', () => {
    sessionStg.set('settings', theme.value)
  })
}
