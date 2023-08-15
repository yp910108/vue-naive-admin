import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore, useThemeStore } from '@/store'

type LayoutHeaderProps = Record<UnionKey.ThemeLayoutMode, App.GlobalHeaderProps>

const layoutHeaderProps: LayoutHeaderProps = {
  vertical: {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: true
  },
  'vertical-mix': {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: false
  },
  horizontal: {
    showLogo: true,
    showHeaderMenu: true,
    showMenuCollapse: false
  },
  'horizontal-mix': {
    showLogo: true,
    showHeaderMenu: false,
    showMenuCollapse: true
  }
}

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

  const headerProps = computed(() => {
    return layoutHeaderProps[theme.value.layout.mode]
  })

  return {
    mode,
    siderVisible,
    siderWidth,
    siderCollapsedWidth,
    headerProps
  }
}
