import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCacheStore } from '../cache'

export const useAppStore = defineStore('app-store', () => {
  const cacheStore = useCacheStore()

  /**
   * 滚动元素的 id
   */
  const scrollElId = ref('__SCROLL_EL_ID__')

  const siderCollapse = ref(false)

  const setSiderCollapse = (collapse: boolean) => {
    siderCollapse.value = collapse
  }

  const toggleSiderCollapse = () => {
    siderCollapse.value = !siderCollapse.value
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
    setTimeout(() => {
      reloadFlag.value = true
      cacheStore.addCache(key)
    }, 500)
  }

  return {
    scrollElId,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    getScrollInfo,
    reloadFlag,
    reloadPage
  }
})
