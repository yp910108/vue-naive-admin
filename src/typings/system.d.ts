declare namespace I18nType {
  type Lang = 'en' | 'zh-CN' | 'km-KH'

  type Schema = {
    system: {
      title: string
    }
    common: {
      add: string
      addSuccess: string
      edit: string
      editSuccess: string
      delete: string
      deleteSuccess: string
      batchDelete: string
      confirm: string
      cancel: string
      pleaseCheckValue: string
      action: string
    }
    routes: {
      dashboard: {
        _value: string
        analysis: string
        workbench: string
      }
      document: {
        _value: string
        vue: string
        vite: string
        naive: string
        project: string
        'project-link': string
      }
      component: {
        _value: string
        button: string
        card: string
        table: string
      }
      plugin: {
        _value: string
        charts: {
          _value: string
          antv: string
          echarts: string
        }
        copy: string
        editor: {
          _value: string
          markdown: string
          quill: string
        }
        icon: string
        map: string
        print: string
        swiper: string
        video: string
      }
      'auth-demo': {
        _value: string
        permission: string
        super: string
      }
      function: {
        _value: string
        tab: string
      }
      exception: {
        _value: string
        '403': string
        '404': string
        '500': string
      }
      'multi-menu': {
        _value: string
        first: {
          _value: string
          second: string
          'second-new': {
            _value: string
            third: string
          }
        }
      }
      management: {
        _value: string
        auth: string
        role: string
        route: string
        user: string
      }
      about: string
    }
    layout: {
      settingDrawer: {
        title: string
        themeModeTitle: string
        darkMode: string
        layoutModelTitle: string
        systemThemeTitle: string
        pageFunctionsTitle: string
        pageViewTitle: string
        followSystemTheme: string
        isCustomizeDarkModeTransition: string
        scrollMode: string
        scrollModeList: {
          wrapper: string
          content: string
        }
        fixedHeaderAndTab: string
        header: {
          inverted: string
          height: string
          crumb: {
            visible: string
            icon: string
          }
        }
        tab: {
          visible: string
          height: string
          modeList: {
            mode: string
            chrome: string
            button: string
          }
          isCache: string
        }
        sider: {
          inverted: string
          width: string
          mixWidth: string
        }
        menu: {
          horizontalPosition: string
          horizontalPositionList: {
            flexStart: string
            center: string
            flexEnd: string
          }
        }
        footer: {
          inverted: string
          visible: string
          fixed: string
          right: string
        }
        page: {
          animate: string
          animateMode: string
          animateModeList: {
            zoomFade: string
            zoomOut: string
            fadeSlide: string
            fade: string
            fadeBottom: string
            fadeScale: string
          }
        }
        systemTheme: {
          moreColors: string
        }
        themeConfiguration: {
          title: string
          copy: string
          reset: string
          resetSuccess: string
          operateSuccess: string
          copySuccess: string
          confirmCopy: string
        }
      }
    }
    page: {
      login: {
        common: {
          userNamePlaceholder: string
          phonePlaceholder: string
          codePlaceholder: string
          passwordPlaceholder: string
          confirmPasswordPlaceholder: string
          codeLogin: string
          confirm: string
          back: string
          validateSuccess: string
          loginSuccess: string
          welcomeBack: string
        }
        pwdLogin: {
          title: string
          rememberMe: string
          forgetPassword: string
          register: string
          otherAccountLogin: string
          otherLoginMode: string
          superAdmin: string
          admin: string
          user: string
        }
        codeLogin: {
          title: string
          getCode: string
          imageCodePlaceholder: string
        }
        register: {
          title: string
          agreement: string
          protocol: string
          policy: string
        }
        resetPwd: {
          title: string
        }
        bindWeChat: {
          title: string
        }
      }
    }
  }

  type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never

  type I18nKey = GetI18nKey<Schema>

  type T = {
    (key: I18nKey): string
    (
      key: I18nType.I18nKey,
      named: Record<string, unknown>,
      options?: import('vue-i18n').TranslateOptions<I18nType.Lang>
    ): string
  }
}

declare namespace Service {
  /**
   * 请求的错误类型：
   * - http: 网络错误、请求超时、网关错误等
   * - backend: 请求成功，响应的 http 状态码为 200，由后端定义的业务错误
   */
  type RequestErrorType = 'http' | 'backend'

  interface RequestError {
    type: RequestErrorType
    code: string | number
    msg: string
  }

  interface BackendResultConfig {
    codeKey: string
    dataKey: string
    messageKey: string
    successCode: number | string
  }

  interface MockServiceResult<T = any> {
    code: string | number
    data: T
    message: string
  }
}

declare namespace Theme {
  // 布局样式
  interface Layout {
    minWidth: number // 最小宽度
    mode: UnionKey.ThemeLayoutMode // 布局模式
    modeList: Common.OptionWithKey<UnionKey.ThemeLayoutMode>[] // 布局模式列表
  }

  // 其他主题颜色
  interface OtherColor {
    info: string // 信息
    success: string // 成功
    warning: string // 警告
    error: string // 错误
  }

  // 面包屑样式
  interface Crumb {
    visible: boolean // 面包屑可见
    showIcon: boolean // 显示图标
  }

  // 头部样式
  interface Header {
    inverted: boolean // 头部反转色
    height: number // 头部高度
    crumb: Crumb // 面包屑样式
  }

  // 标多页签样式
  export interface Tab {
    visible: boolean // 多页签可见
    height: number // 多页签高度
    mode: UnionKey.ThemeTabMode // 多页签风格
    modeList: Common.OptionWithKey<UnionKey.ThemeTabMode>[] // 多页签风格列表
    isCache: boolean // 开启多页签缓存
  }

  // 侧边栏样式
  interface Sider {
    inverted: boolean // 侧边栏反转色
    width: number // 侧边栏宽度
    collapsedWidth: number // 侧边栏折叠时的宽度
    mixWidth: number // vertical-mix 模式下侧边栏宽度
    mixCollapsedWidth: number // vertical-mix 模式下侧边栏折叠时的宽度
    mixChildMenuWidth: number // vertical-mix 模式下侧边栏的子菜单的宽度
  }

  // 菜单样式
  interface Menu {
    horizontalPosition: UnionKey.ThemeHorizontalMenuPosition // 水平模式的菜单的位置
    horizontalPositionList: Common.OptionWithKey<UnionKey.ThemeHorizontalMenuPosition>[] // 水平模式的菜单的位置列表
  }

  // 底部样式
  interface Footer {
    visible: boolean // 底部是否可见
    fixed: boolean // 是否固定底部
    right: boolean // 底部是否居右（顶部混合菜单模式有效）
    height: number // 底部高度
    inverted: boolean // 底部反转色
  }

  // 页面样式
  interface Page {
    animate: boolean // 页面是否开启动画
    animateMode: UnionKey.ThemeAnimateMode // 动画类型
    animateModeList: Common.OptionWithKey<UnionKey.ThemeAnimateMode>[] // 动画类型列表
  }

  interface Setting {
    darkMode: boolean // 暗黑模式
    followSystemTheme: boolean // 是否自动跟随系统主题
    isCustomizeDarkModeTransition: boolean // 自定义暗黑动画过渡
    layout: Layout // 布局样式
    scrollMode: UnionKey.ThemeScrollMode // 滚动模式
    scrollModeList: Common.OptionWithKey<UnionKey.ThemeScrollMode>[] // 滚动模式列表
    themeColor: string // 主题颜色
    themeColorList: string[] // 主题颜色列表
    otherColor: OtherColor // 其他颜色
    isCustomizeInfoColor: boolean // 是否自定义 info 的颜色（默认取比主题色深一级的颜色）
    fixedHeaderAndTab: boolean // 固定头部和多页签
    showReload: boolean // 显示重载按钮
    header: Header // 头部样式
    tab: Tab // 标多页签样式
    sider: Sider // 侧边栏样式
    menu: Menu // 菜单样式
    footer: Footer // 底部样式
    page: Page // 页面样式
  }
}

/** 多页签 Tab 的路由 */
declare namespace App {
  interface GlobalTabRoute
    extends Pick<import('vue-router').RouteLocationNormalizedLoaded, 'name' | 'fullPath' | 'meta'> {
    scrollPosition: {
      left: number
      top: number
    }
  }

  interface GlobalHeaderProps {
    showLogo: boolean // 显示 logo
    showHeaderMenu: boolean // 显示头部菜单
    showMenuCollapse: boolean // 显示菜单折叠按钮
  }

  type GlobalMenuOption = import('naive-ui').MenuOption & {
    key: string
    label: string
    routeName: string
    routePath: string
    icon?: () => import('vue').VNodeChild
    children?: GlobalMenuOption[]
    i18nTitle?: I18nType.I18nKey
  }

  type GlobalBreadcrumb = Omit<import('naive-ui').DropdownOption, 'icon'> & {
    key: string
    label: string
    disabled: boolean
    routeName: string
    hasChildren: boolean
    icon?: import('vue').Component
    i18nTitle?: I18nType.I18nKey
    options?: (import('naive-ui/es/dropdown/src/interface').DropdownMixedOption & {
      i18nTitle?: I18nType.I18nKey
    })[]
  }

  interface MessageTab {
    key: number // tab 的key
    name: string // tab 名称
    badgeProps?: import('naive-ui').BadgeProps // badge 类型
    list: MessageList[] // 消息数据
  }

  interface MessageList {
    id: number // 数据唯一值
    avatar?: string // 头像
    icon?: Icon.IconName // 消息 icon
    svgIcon?: string
    title: string // 消息标题
    date?: string // 消息发送时间
    isRead?: boolean // 消息是否已读
    description?: string // 消息描述
    tagTitle?: string // 标签名称
    tagProps?: import('naive-ui').TagProps // 标签props
  }
}
