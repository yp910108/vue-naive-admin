import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import progress from 'vite-plugin-progress'
import pageRoute from '@soybeanjs/vite-plugin-vue-page-route'
import icon from './icon'
import components from './components'
import mock from './mock'

export function setupVitePlugins(env: ImportMetaEnv) {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    unocss(),
    components,
    icon(),
    mock(env),
    progress()
  ]

  if (env.VITE_SOYBEAN_ROUTE_PLUGIN === 'Y') {
    plugins.push(pageRoute())
  }

  return plugins
}
