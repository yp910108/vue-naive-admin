import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'
import { scrollTo } from '@/utils'
import { useCacheStore } from '../cache'

export const useAppStore = defineStore('app-store', () => {
  const cacheStore = useCacheStore()

  /**
   * 滚动元素的 id
   */
  const scrollElId = ref('__SCROLL_EL_ID__')

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
   * 获取滚动区域的滚动位置信息
   */
  const getScrollInfo = () => {
    const scrollEl = document.querySelector(`#${scrollElId.value}`)
    const { scrollLeft = 0, scrollTop = 0 } = scrollEl ?? {}
    return { scrollEl, scrollLeft, scrollTop }
  }

  /**
   * 重载页面（控制页面的显示）
   */
  const reloadFlag = ref(true)
  const reloadPage = (key: string) => {
    reloadFlag.value = false
    cacheStore.removeCache(key)
    nextTick(() => {
      reloadFlag.value = true
      cacheStore.addCache(key)
      setTimeout(() => {
        const { scrollEl } = getScrollInfo()
        scrollEl && scrollTo(scrollEl)
      }, 600)
    })
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

    getScrollInfo,

    reloadFlag,
    reloadPage
  }
})
