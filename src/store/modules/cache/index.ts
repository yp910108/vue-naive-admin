import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useTabStore } from '../tab'

export const useCacheStore = defineStore('cache-store', () => {
  const router = useRouter()
  const tabStore = useTabStore()

  const caches = ref<string[]>([])
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

  tabStore.$subscribe((_, { tabs }) => {
    const routes = router.getRoutes()
    const _caches = []
    for (const { key } of tabs) {
      const route = routes.find(({ name }) => name === key)
      if (route?.meta.keepAlive) {
        _caches.push(key)
      }
    }
    caches.value = _caches
  })

  return { caches, addCache, removeCache }
})
