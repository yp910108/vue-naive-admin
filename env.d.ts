/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string // 项目基本地址

  readonly VITE_APP_NAME: string // 项目名称

  readonly VITE_APP_TITLE: string // 项目标题

  readonly VITE_APP_DESC: string // 项目描述

  readonly VITE_PROD_MOCK?: 'Y' | 'N' // 是否开启生产模式下的 mock，生产模式下会拦截 XHR，导致无法获取 response，不使用 mock 请求时设置为 N

  readonly VITE_HASH_ROUTE?: 'Y' | 'N' // 是否 hash 路由模式
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
