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
    message: string
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

declare namespace App {
  /**
   * 菜单
   */
  type GlobalMenuOption = import('naive-ui').MenuOption & {
    key: string
    label: string
    routePath: string
    icon?: () => import('vue').Component
    children?: GlobalMenuOption[]
  }

  /**
   * 面包屑
   */
  type GlobalBreadcrumb = GlobalMenuOption

  /**
   * 搜索菜单
   */
  type GlobalSearchMenu = {
    key: string
    label: string
    routePath: string
    icon?: () => import('vue').Component
  }

  interface MessageList {
    id: number // 数据唯一值
    avatar?: string // 头像
    icon?: Icon.IconName // 消息 icon
    title: string // 消息标题
    date?: string // 消息发送时间
    isRead?: boolean // 消息是否已读
    description?: string // 消息描述
    tagTitle?: string // 标签名称
    tagProps?: import('naive-ui').TagProps // 标签props
  }

  interface MessageTab {
    key: number // tab 的key
    name: string // tab 名称
    badgeProps?: import('naive-ui').BadgeProps // badge 类型
    list: MessageList[] // 消息数据
  }

  /**
   * 多页签 Tab 的路由
   */
  type GlobalTab = {
    key: string
    title: string
    routePath: string
    icon?: Icon.IconName
    scrollPosition: {
      left: number
      top: number
    }
  }
}
