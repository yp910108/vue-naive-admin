import { watch } from 'vue'
import { useAppStore } from '@/store'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default function useMobile() {
  const appStore = useAppStore()

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isMobile = breakpoints.smaller('sm')

  watch(
    isMobile,
    (newVal) => {
      if (newVal) {
        appStore.setSiderCollapse(true)
      }
    },
    { immediate: true }
  )

  return { isMobile }
}
