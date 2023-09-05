import type { Route } from '@/store'

export const routeModel: Route[] = [
  {
    title: '仪表盘',
    path: 'dashboard',
    icon: 'monitor-dashboard',
    children: [
      {
        title: '分析页',
        path: 'analysis',
        icon: 'analysis'
      },
      {
        title: '工作台',
        path: 'workbench',
        icon: 'workbench'
      }
    ]
  },
  {
    title: '文档',
    path: 'document',
    icon: 'file-document-multiple-outline',
    children: [
      {
        title: 'vue 文档',
        path: 'vue',
        icon: 'vue'
      },
      {
        title: 'naive 文档',
        path: 'naive',
        icon: 'naiveui'
      }
    ]
  },
  {
    title: '外部链接',
    path: 'external-link',
    icon: 'external-link',
    children: [
      {
        title: '项目地址',
        path: 'https://github.com/yp910108/vue-naive-admin',
        icon: 'logo'
      }
    ]
  },
  {
    title: '功能',
    path: 'function',
    icon: 'all-application',
    children: [
      {
        title: 'Tab 页签',
        path: 'tab',
        icon: 'round-tab'
      }
    ]
  },
  {
    title: '异常页',
    path: 'exception',
    icon: 'exception-outlined',
    children: [
      {
        title: '异常页 403',
        path: '403',
        icon: 'baseline-block'
      },
      {
        title: '异常页 404',
        path: '404',
        icon: 'baseline-web-asset-off'
      },
      {
        title: '异常页 500',
        path: '500',
        icon: 'baseline-wifi-off'
      }
    ]
  },
  {
    title: '多级菜单',
    path: 'multi-menu',
    icon: 'menu',
    children: [
      {
        title: '一级菜单',
        path: 'first',
        icon: 'menu',
        children: [
          {
            title: '二级菜单',
            path: 'second',
            icon: 'menu'
          },
          {
            title: '二级菜单（有子菜单）',
            path: 'second-new',
            icon: 'menu',
            children: [
              {
                title: '三级菜单',
                path: 'third',
                icon: 'menu'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: '关于',
    path: 'about',
    icon: 'book-information-24-regular'
  }
]
