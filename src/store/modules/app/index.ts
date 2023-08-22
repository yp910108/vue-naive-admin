import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'
import { LAYOUT_SCROLL_EL_ID } from '@soybeanjs/vue-materials'

export const useAppStore = defineStore('app-store', () => {
  /**
   * 滚动元素的 id
   */
  const scrollElId = ref(LAYOUT_SCROLL_EL_ID)

  /**
   * 主体内容是否全屏
   */
  const contentFull = ref(false)
  const setContentFull = (full: boolean) => {
    contentFull.value = full
  }

  /**
   * 侧边栏折叠状态
   */
  const siderCollapse = ref(false)
  const setSiderCollapse = (collapse: boolean) => {
    siderCollapse.value = collapse
  }
  const toggleSiderCollapse = () => {
    siderCollapse.value = !siderCollapse.value
  }

  /**
   * vertical-mix 模式下，侧边栏的固定状态
   */
  const mixSiderFixed = ref(false)
  const toggleMixSiderFixed = () => {
    mixSiderFixed.value = !mixSiderFixed.value
  }

  /**
   * 禁用主体内容的水平方向的滚动
   */
  const disableMainXScroll = ref(false)
  const setDisableMainXScroll = (disable: boolean) => {
    disableMainXScroll.value = disable
  }

  /**
   * 项目配置的抽屉可见状态
   */
  const settingDrawerVisible = ref(false)
  const closeSettingDrawer = () => {
    settingDrawerVisible.value = false
  }
  const toggleSettingDrawerVisible = () => {
    settingDrawerVisible.value = !settingDrawerVisible.value
  }

  /**
   * 重载页面（控制页面的显示）
   */
  const reloadFlag = ref(true)
  const reloadPage = async (duration = 0) => {
    reloadFlag.value = false
    setTimeout(() => {
      reloadFlag.value = true
    }, duration)
  }

  return {
    scrollElId,

    contentFull,
    setContentFull,

    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,

    mixSiderFixed,
    toggleMixSiderFixed,

    disableMainXScroll,
    setDisableMainXScroll,

    settingDrawerVisible,
    closeSettingDrawer,
    toggleSettingDrawerVisible,

    reloadFlag,
    reloadPage
  }
})
