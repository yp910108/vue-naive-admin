import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCacheStore, useTabStore } from '../modules'

export const subscribeCacheStore = () => {
  const router = useRouter()

  const tabStore = useTabStore()

  const cacheStore = useCacheStore()

  watch(
    () => tabStore.tabs,
    (newTabs) => {
      const routes = router.getRoutes()
      const caches = []
      for (const { key, cache } of newTabs) {
        const route = routes.find(({ name }) => name === key)
        if (route?.meta.keepAlive || cache) {
          caches.push(key)
        }
      }
      cacheStore.setCaches(caches)
    }
  )
}
