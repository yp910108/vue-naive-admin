import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NScrollbar } from 'naive-ui'
import { useCacheStore } from '../cache'

export const useAppStore = defineStore('app-store', () => {
  const cacheStore = useCacheStore()

  const siderCollapse = ref(false)

  const setSiderCollapse = (collapse: boolean) => {
    siderCollapse.value = collapse
  }

  const toggleSiderCollapse = () => {
    siderCollapse.value = !siderCollapse.value
  }

  const scrollRef = ref<InstanceType<typeof NScrollbar>>()

  /**
   * 获取滚动区域的滚动位置信息
   */
  const getScrollInfo = () => {
    const scrollEl = (scrollRef.value?.$refs.scrollbarInstRef as any)
      ?.containerRef as HTMLDivElement | null
    const { scrollLeft = 0, scrollTop = 0 } = scrollEl ?? {}
    return { left: scrollLeft, top: scrollTop }
  }

  interface ScrollToOption {
    left?: number
    top?: number
    behavior?: ScrollBehavior
  }

  const scrollTo = (position: ScrollToOption) => {
    scrollRef.value?.scrollTo(position)
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
    scrollRef,
    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    getScrollInfo,
    scrollTo,
    reloadFlag,
    reloadPage
  }
})
