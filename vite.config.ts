import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins, setupViteProxy } from './build'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv
  return {
    base: env.VITE_BASE_URL,
    plugins: setupVitePlugins(env),
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('.', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scrollbar.scss" as *;`
        }
      }
    },
    optimizeDeps: {
      include: ['@better-scroll/core', '@better-scroll/mouse-wheel', 'echarts']
    },
    server: {
      proxy: setupViteProxy()
    },
    build: {
      reportCompressedSize: false
    }
  }
})
