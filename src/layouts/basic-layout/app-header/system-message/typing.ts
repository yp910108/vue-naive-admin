export interface MessageList {
  /**
   * 数据唯一值
   */
  id: number
  /**
   * 头像
   */
  avatar?: string
  /**
   * 消息 icon
   */
  icon?: string
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息发送时间
   */
  date?: string
  /**
   * 消息是否已读
   */
  isRead?: boolean
  /**
   * 消息描述
   */
  description?: string
  /**
   * 标签名称
   */
  tagTitle?: string
  /**
   * 标签props
   */
  tagProps?: import('naive-ui').TagProps
}

export interface MessageTab {
  /**
   * tab 的key
   */
  key: number
  /**
   * tab 名称
   */
  name: string
  /**
   * badge 类型
   */
  badgeProps?: import('naive-ui').BadgeProps
  /**
   * 消息数据
   */
  list: MessageList[]
}
