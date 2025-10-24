import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore, useSettingsStore } from '@/store'
import { SIDER_COLLAPSED_WIDTH } from './constants'

export const useSider = () => {
  const appStore = useAppStore()

  const { isSmallScreen, siderCollapse } = storeToRefs(appStore)

  watch(
    isSmallScreen,
    (newVal) => {
      if (newVal) {
        appStore.setSiderCollapse(true)
      } else {
        appStore.setSiderCollapse(false)
      }
    },
    { immediate: true }
  )

  const { settings } = storeToRefs(useSettingsStore())

  const showMask = computed(() => isSmallScreen.value && !siderCollapse.value)

  const handleMaskClick = () => {
    appStore.setSiderCollapse(true)
  }

  const maskCls = 'absolute z-2 left-0 top-0 size-full bg-[rgba(0,0,0,0.2)] cursor-pointer'

  const siderWidth = computed(() =>
    isSmallScreen.value || !siderCollapse.value
      ? `${settings.value.sider.width}px`
      : `${SIDER_COLLAPSED_WIDTH}px`
  )

  const siderClass = computed(() => {
    const cls = ['z-2 shrink-0 w-[var(--width)] transition-all-300']
    if (isSmallScreen.value) {
      cls.push('absolute h-full')
      if (siderCollapse.value) {
        cls.push('translate-x--100%')
      }
    } else {
      cls.push('relative')
    }
    return cls
  })

  const siderStyle = computed(() => ({ '--width': siderWidth.value }))

  return { showMask, maskCls, handleMaskClick, siderClass, siderStyle }
}
