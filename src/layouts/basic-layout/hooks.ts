import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useAppStore, useThemeStore } from '@/store'

export function useMobile() {
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

export function useLayout() {
  const appStore = useAppStore()
  const { theme } = storeToRefs(useThemeStore())

  const mode = computed(() => {
    const mode = theme.value.layout.mode
    return mode.includes('vertical') ? 'vertical' : 'horizontal'
  })

  const siderVisible = computed(() => {
    const mode = theme.value.layout.mode
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

  return {
    mode,
    siderVisible,
    siderWidth,
    siderCollapsedWidth
  }
}
