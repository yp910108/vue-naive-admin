import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAppStore, useThemeStore } from '@/store'

export default function useLayout() {
  const appStore = useAppStore()
  const themeStore = useThemeStore()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const { theme } = storeToRefs(themeStore)

  const mode = computed(() => {
    const mode = themeStore.theme.layout.mode
    return mode.includes('vertical') ? 'vertical' : 'horizontal'
  })

  const isMobile = breakpoints.smaller('sm')

  const siderVisible = computed(() => {
    const mode = themeStore.theme.layout.mode
    return mode !== 'horizontal'
  })

  const siderWidth = computed(() => {
    const { width, mixWidth, mixChildMenuWidth } = theme.value.sider
    const isVerticalMix = theme.value.layout.mode === 'vertical-mix'
    let w = isVerticalMix ? mixWidth : width
    if (isVerticalMix && appStore.mixSiderFixed) {
      w += mixChildMenuWidth
    }
    return w
  })

  const siderCollapsedWidth = computed(() => {
    const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = theme.value.sider
    const isVerticalMix = theme.value.layout.mode === 'vertical-mix'
    let w = isVerticalMix ? mixCollapsedWidth : collapsedWidth
    if (isVerticalMix && appStore.mixSiderFixed) {
      w += mixChildMenuWidth
    }
    return w
  })

  watch(
    isMobile,
    (newVal) => {
      if (newVal) {
        appStore.setSiderCollapse(true)
      }
    },
    { immediate: true }
  )

  return {
    mode,
    isMobile,
    siderVisible,
    siderWidth,
    siderCollapsedWidth
  }
}
