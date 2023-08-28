import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { createDiscreteApi, type ConfigProviderProps } from 'naive-ui'
import { useThemeStore } from '@/store'

export function setupDiscreteApis() {
  const { naiveTheme, naiveThemeOverrides } = storeToRefs(useThemeStore())

  const configProviderProps = computed<ConfigProviderProps>(() => ({
    theme: naiveTheme.value,
    themeOverrides: naiveThemeOverrides.value
  }))

  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps }
  )

  window.$message = message
  window.$notification = notification
  window.$dialog = dialog
  window.$loadingBar = loadingBar
}
