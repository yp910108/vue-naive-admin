import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useTabStore } from '../tab'

export const useCacheStore = defineStore('cache-store', () => {
  const router = useRouter()

  const tabStore = useTabStore()

  const caches = ref<string[]>([])

  const setCaches = (_caches: string[]) => {
    caches.value = _caches
  }

  const addCache = (key: string) => {
    const routes = router.getRoutes()
    const route = routes.find(({ name }) => name === key)
    if (route?.meta.keepAlive) {
      caches.value.push(key)
    }
  }

  const removeCache = (cache: string) => {
    const index = caches.value.indexOf(cache)
    if (index !== -1) {
      caches.value.splice(index, 1)
    }
  }

  // TODO test watch & watchEffect & $subscribe
  watch(
    () => tabStore.tabs,
    (newTabs) => {
      const routes = router.getRoutes()
      const _caches = []
      for (const { key, cache } of newTabs) {
        const route = routes.find(({ name }) => name === key)
        if (route?.meta.keepAlive || cache) {
          _caches.push(key)
        }
      }
      caches.value = _caches
    }
  )

  return { caches, setCaches, addCache, removeCache }
})
