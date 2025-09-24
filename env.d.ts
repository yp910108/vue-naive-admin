/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 是否开启 mock，开启 mock 会拦截 XHR，导致无法获取 response
   */
  readonly VITE_MOCK?: 'Y' | 'N'

  /**
   * 项目基本地址
   */
  readonly VITE_BASE_URL: string

  /**
   * 项目名称
   */
  readonly VITE_APP_NAME: string

  /**
   * 是否 hash 路由模式
   */
  readonly VITE_HASH_ROUTE?: 'Y' | 'N'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
