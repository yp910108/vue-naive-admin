import { viteMockServe } from 'vite-plugin-mock'

export default function mock({ VITE_PROD_MOCK }: ImportMetaEnv) {
  const prodMock = VITE_PROD_MOCK === 'Y'

  return viteMockServe({
    mockPath: 'mock',
    prodEnabled: prodMock,
    injectCode: `
			import { setupMockServer } from '../mock';
			setupMockServer();
		`
  })
}
