import { createApp } from 'vue'
import { setupAssets, setupDiscreteApis, setupProdMockServer } from './plugins'
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

  setupStore(app)

  setupDiscreteApis()

  await setupProdMockServer()

  await setupRouter(app)

  appLoading.unmount()

  app.mount('#app')
}

setupApp()
