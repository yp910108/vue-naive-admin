import { createApp } from 'vue'
import { setupAssets } from './plugins'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupI18n } from './locales'
import AppLoading from './components/common/app-loading.vue'
import App from './App.vue'

async function setupApp() {
  setupAssets()

  const appLoading = createApp(AppLoading)
  appLoading.mount('#app')

  const app = createApp(App)

  setupRouter(app)

  setupStore(app)

  setupI18n(app)

  appLoading.unmount()
  app.mount('#app')
}

setupApp()
