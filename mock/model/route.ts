import type { RouteData } from '@/store'

export const routeModel: RouteData[] = [
  {
    title: '仪表盘',
    path: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        title: '分析页',
        path: 'analysis',
        icon: 'dashboard-analysis'
      },
      {
        title: '工作台',
        path: 'workbench',
        icon: 'dashboard-workbench'
      }
    ]
  },
  {
    title: '列表',
    path: 'list',
    icon: 'list',
    children: [
      {
        title: '查询表格',
        path: 'table',
        icon: 'list-table'
      }
    ]
  },
  {
    title: '文档',
    path: 'document',
    icon: 'document',
    children: [
      {
        title: 'vue 文档',
        path: 'vue',
        icon: 'document-vue'
      },
      {
        title: 'naive 文档',
        path: 'naive',
        icon: 'document-naive'
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
        icon: 'external-link-logo'
      }
    ]
  },
  {
    title: '功能',
    path: 'function',
    icon: 'function',
    children: [
      {
        title: 'Tab 页签',
        path: 'tab',
        icon: 'function-tab'
      }
    ]
  },
  {
    title: '异常页',
    path: 'exception',
    icon: 'exception',
    children: [
      {
        title: '异常页 403',
        path: '403',
        icon: 'exception-403'
      },
      {
        title: '异常页 404',
        path: '404',
        icon: 'exception-404'
      },
      {
        title: '异常页 500',
        path: '500',
        icon: 'exception-500'
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
    icon: 'about'
  }
]
