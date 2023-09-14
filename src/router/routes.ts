import type { RouteData } from '@/store'

export const routes: RouteData[] = [
  {
    title: '登录',
    path: 'login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    layout: 'blank',
    white: true
  },
  {
    title: 'Tab 详情',
    path: 'function/tab-detail',
    icon: 'round-tab',
    activeMenu: '/function/tab',
    hide: true
  }
]
