import { createApp } from 'vue'
import { setupAssets, setupDiscreteApis } from './plugins'
import { setupI18n } from './locales'
import { setupStore } from './store'
import { setupRouter } from './router'
import { AppLoading } from './components'
import App from './App.vue'

const setupApp = async () => {
  setupAssets()

  const appLoading = createApp(AppLoading)

  setupStore(appLoading)

  appLoading.mount('#app')

  const app = createApp(App)

  setupI18n(app)

  setupStore(app)

  setupDiscreteApis()

  await setupRouter(app)

  appLoading.unmount()

  app.mount('#app')
}

setupApp()
