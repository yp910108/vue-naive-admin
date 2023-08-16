import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'

export default function useLayout() {
  const appStore = useAppStore()
  const themeStore = useThemeStore()
  const { theme } = storeToRefs(themeStore)

  const mode = computed(() => {
    const mode = themeStore.theme.layout.mode
    return mode.includes('vertical') ? 'vertical' : 'horizontal'
  })

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

  return {
    mode,
    siderVisible,
    siderWidth,
    siderCollapsedWidth
  }
}
