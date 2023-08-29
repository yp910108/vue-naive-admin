import { ProxyOptions } from 'vite'

export function setupViteProxy() {
  const proxy: Record<string, ProxyOptions> = {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/fallback/, '')
    }
  }
  return proxy
}
