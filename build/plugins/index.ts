import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import { components } from './components'
import { mock } from './mock'

export const setupVitePlugins = (env: ImportMetaEnv) => {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    unocss({ inspector: false }),
    components(),
    mock(env)
  ]

  return plugins
}
