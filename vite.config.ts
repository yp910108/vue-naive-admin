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
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: setupViteProxy()
    },
    optimizeDeps: {
      include: ['echarts']
    },
    build: {
      reportCompressedSize: false
    }
  }
})
