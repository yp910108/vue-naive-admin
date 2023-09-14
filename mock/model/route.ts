import type { RouteData } from '@/store'

export const routeModel: RouteData[] = [
  {
    title: '仪表盘',
    path: 'dashboard',
    icon: 'mdi:monitor-dashboard',
    children: [
      {
        title: '分析页',
        path: 'analysis',
        icon: 'icon-park-outline:analysis'
      },
      {
        title: '工作台',
        path: 'workbench',
        icon: 'icon-park-outline:workbench'
      }
    ]
  },
  {
    title: '文档',
    path: 'document',
    icon: 'mdi:file-document-multiple-outline',
    children: [
      {
        title: 'vue 文档',
        path: 'vue',
        icon: 'logos:vue'
      },
      {
        title: 'naive 文档',
        path: 'naive',
        icon: 'logos:naiveui'
      }
    ]
  },
  {
    title: '外部链接',
    path: 'external-link',
    icon: 'mdi:external-link',
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
    icon: 'icon-park-outline:all-application',
    children: [
      {
        title: 'Tab 页签',
        path: 'tab',
        icon: 'ic:round-tab'
      }
    ]
  },
  {
    title: '异常页',
    path: 'exception',
    icon: 'ant-design:exception-outlined',
    children: [
      {
        title: '异常页 403',
        path: '403',
        icon: 'ic:baseline-block'
      },
      {
        title: '异常页 404',
        path: '404',
        icon: 'ic:baseline-web-asset-off'
      },
      {
        title: '异常页 500',
        path: '500',
        icon: 'ic:baseline-wifi-off'
      }
    ]
  },
  {
    title: '多级菜单',
    path: 'multi-menu',
    icon: 'ic:round-menu',
    children: [
      {
        title: '一级菜单',
        path: 'first',
        icon: 'ic:round-menu',
        children: [
          {
            title: '二级菜单',
            path: 'second',
            icon: 'ic:round-menu'
          },
          {
            title: '二级菜单（有子菜单）',
            path: 'second-new',
            icon: 'ic:round-menu',
            children: [
              {
                title: '三级菜单',
                path: 'third',
                icon: 'ic:round-menu'
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
    icon: 'fluent:book-information-24-regular'
  }
]
