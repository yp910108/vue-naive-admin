import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useCacheStore = defineStore('cache-store', () => {
  const router = useRouter()

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

  return { caches, setCaches, addCache, removeCache }
})
