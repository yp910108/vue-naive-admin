import { viteMockServe } from 'vite-plugin-mock'

export const mock = ({ VITE_MOCK }: ImportMetaEnv) => {
  const prodMock = VITE_MOCK === 'Y'

  return viteMockServe({
    mockPath: 'mock',
    enable: prodMock
  })
}
