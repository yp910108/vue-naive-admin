import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import unocss from 'unocss/vite'
import components from './components'
import compress from './compress'
import mock from './mock'
import pwa from './pwa'

export function setupVitePlugins(env: ImportMetaEnv) {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    vueDevTools(),
    unocss(),
    components(),
    mock(env)
  ]

  if (env.VITE_COMPRESS === 'Y') {
    plugins.push(compress())
  }

  if (env.VITE_PWA === 'Y') {
    plugins.push(pwa())
  }

  return plugins
}
