import type { MockMethod } from 'vite-plugin-mock'
import { createProdMockServer } from 'vite-plugin-mock/client'

type Modules = Record<string, { default: MockMethod[] }>

export const setupProdMockServer = async () => {
  if (import.meta.env.VITE_MOCK === 'Y') {
    const modules: Modules = import.meta.glob('../../mock/**/*.ts', { eager: true })
    const methods: MockMethod[] = []
    for (const [_key, module] of Object.entries(modules)) {
      methods.push(...module.default)
    }
    await createProdMockServer(methods)
  }
}
