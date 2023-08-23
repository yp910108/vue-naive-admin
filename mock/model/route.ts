export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
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
          title: 'vite 文档',
          path: 'vite',
          icon: 'vitejs'
        },
        {
          title: 'naive 文档',
          path: 'naive',
          icon: 'naiveui'
        },
        {
          title: '项目文档',
          path: 'project',
          icon: 'logo'
        },
        {
          title: '项目文档（外链）',
          path: 'https://docs.soybean.pro',
          icon: 'logo'
        }
      ]
    },
    {
      title: '组件示例',
      path: 'component',
      icon: 'app-store-24-filled',
      children: [
        {
          title: '按钮',
          path: 'button',
          icon: 'button-cursor'
        },
        {
          title: '卡片',
          path: 'card',
          icon: 'card-outline'
        },
        {
          title: '表格',
          path: 'table',
          icon: 'table-large'
        }
      ]
    },
    {
      title: '插件示例',
      path: '/plugin',
      icon: 'plugin-line',
      children: [
        {
          title: '图表',
          path: 'charts',
          icon: 'chart-areaspline',
          children: [
            {
              title: 'ECharts',
              path: 'echarts',
              icon: 'apacheecharts'
            },
            {
              title: 'AntV',
              path: 'antv',
              icon: 'antdesign'
            }
          ]
        },
        {
          title: '地图',
          path: 'map',
          icon: 'map'
        },
        {
          title: '视频',
          path: 'video',
          icon: 'video'
        },
        {
          title: '编辑器',
          path: 'editor',
          icon: 'editor',
          children: [
            {
              title: '富文本编辑器',
              path: 'quill',
              icon: 'file-document-edit-outline'
            },
            {
              title: 'markdown 编辑器',
              path: 'markdown',
              icon: 'markdown-line'
            }
          ]
        },
        {
          title: 'Swiper 插件',
          path: 'swiper',
          icon: 'swiper'
        },
        {
          title: '剪贴板',
          path: 'copy',
          icon: 'clipboard-outline'
        },
        {
          title: '图标',
          path: 'icon',
          icon: 'custom-icon'
        },
        {
          title: '打印',
          path: 'print',
          icon: 'printer'
        }
      ]
    },
    {
      title: '权限示例',
      path: 'auth-demo',
      icon: 'baseline-security',
      children: [
        {
          title: '权限切换',
          path: 'permission',
          icon: 'round-construction'
        },
        {
          title: '超级管理员可见',
          path: 'super',
          icon: 'round-supervisor-account'
        }
      ]
    },
    {
      title: '功能',
      path: 'function',
      icon: 'all-application',
      children: [
        {
          title: 'Tab',
          path: 'tab',
          icon: 'round-tab'
        },
        {
          title: 'Tab Detail',
          path: 'tab-detail',
          icon: 'round-tab'
        },
        {
          title: 'Tab Multi Detail',
          path: 'tab-multi-detail',
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
                  path: 'second-new/third',
                  icon: 'menu'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: '系统管理',
      path: '/management',
      icon: 'cloud-service-management',
      children: [
        {
          title: '权限管理',
          path: 'auth',
          icon: 'baseline-security'
        },
        {
          title: '角色管理',
          path: 'role',
          icon: 'user-role'
        },
        {
          title: '用户管理',
          path: 'user',
          icon: 'round-manage-accounts'
        },
        {
          title: '路由管理',
          path: 'route',
          icon: 'route'
        }
      ]
    },
    {
      title: '关于',
      path: 'about',
      icon: 'book-information-24-regular'
    }
  ],
  admin: [],
  user: []
}
