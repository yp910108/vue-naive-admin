import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useTabStore } from '../tab'

export const useCacheStore = defineStore('cache-store', () => {
  const router = useRouter()
  const tabStore = useTabStore()

  const caches = ref<string[]>([])

  tabStore.$subscribe((_, { tabs }) => {
    const routes = router.getRoutes()
    const _caches = []
    for (const { key: cache } of tabs) {
      const route = routes.find(({ name }) => name === cache)
      if (route?.meta.keepAlive) {
        _caches.push(cache)
      }
    }
    caches.value = _caches
  })

  return { caches }
})
