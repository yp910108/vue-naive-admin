import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'
import { LAYOUT_SCROLL_EL_ID } from '@soybeanjs/vue-materials'

export const useAppStore = defineStore('app-store', () => {
  const scrollElId = ref(LAYOUT_SCROLL_EL_ID)
  const contentFull = ref(false)
  const disableMainXScroll = ref(false)
  const reloadFlag = ref(true)
  const settingDrawerVisible = ref(false)
  const siderCollapse = ref(false)
  const mixSiderFixed = ref(false)

  const setDisableMainXScroll = (disable: boolean) => {
    disableMainXScroll.value = disable
  }

  const toggleSettingDrawerVisible = () => {
    settingDrawerVisible.value = !settingDrawerVisible.value
  }

  const setSiderCollapse = (collapse: boolean) => {
    siderCollapse.value = collapse
  }

  const toggleSiderCollapse = () => {
    siderCollapse.value = !siderCollapse.value
  }

  const toggleMixSiderFixed = () => {
    mixSiderFixed.value = !mixSiderFixed.value
  }

  const closeSettingDrawer = () => {
    settingDrawerVisible.value = false
  }

  const setContentFull = (full: boolean) => {
    contentFull.value = full
  }

  const reloadPage = async (duration = 0) => {
    reloadFlag.value = false
    await nextTick()
    if (duration) {
      setTimeout(() => {
        reloadFlag.value = true
      }, duration)
    } else {
      reloadFlag.value = true
    }
    setTimeout(() => {
      document.documentElement.scrollTo({ left: 0, top: 0 })
    }, 100)
  }

  return {
    scrollElId,
    contentFull,
    disableMainXScroll,
    reloadFlag,
    settingDrawerVisible,
    siderCollapse,
    mixSiderFixed,
    setDisableMainXScroll,
    toggleSettingDrawerVisible,
    setSiderCollapse,
    toggleSiderCollapse,
    toggleMixSiderFixed,
    closeSettingDrawer,
    setContentFull,
    reloadPage
  }
})
