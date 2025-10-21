import { viteMockServe } from 'vite-plugin-mock'

export const mock = ({ VITE_MOCK }: ImportMetaEnv) => {
  return viteMockServe({
    mockPath: 'mock',
    enable: VITE_MOCK === 'Y'
  })
}
