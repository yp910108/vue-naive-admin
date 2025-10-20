import type { App } from 'vue'
import { createPinia } from 'pinia'

export const setupStore = (app: App) => {
  const store = createPinia()
  app.use(store)
}

export * from './modules'

export * from './subscribe'
