import { createApp } from 'vue'
import { setupAssets, setupDiscreteApis } from './plugins'
import { setupStore } from './store'
import { setupI18n } from './locales'
import { setupRouter } from './router'
import { AppLoading } from './components'
import App from './App.vue'

async function setupApp() {
  const appLoading = createApp(AppLoading)
  appLoading.mount('#app')

  const app = createApp(App)

  setupStore(app)

  setupAssets()
  setupDiscreteApis()

  setupI18n(app)

  await setupRouter(app)

  appLoading.unmount()
  app.mount('#app')
}

setupApp()
