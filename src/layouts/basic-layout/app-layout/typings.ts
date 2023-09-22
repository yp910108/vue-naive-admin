import type { Settings } from '@/settings'

type LayoutMode = Settings['layout']['mode']

type ScrollMode = Settings['scrollMode']

export interface LayoutProps {
  mode?: LayoutMode
  isMobile?: boolean
  scrollMode?: ScrollMode
  /**
   * 滚动元素的 id
   */
  scrollElId?: string

  siderVisible?: boolean
  siderCollapse?: boolean
  siderWidth?: number
  siderCollapsedWidth?: number

  fixedTop?: boolean

  headerVisible?: boolean
  headerHeight?: number

  tabVisible?: boolean
  tabHeight?: number

  /**
   * 主体内容是否全屏铺满
   */
  contentFull?: boolean
  contentClass?: string

  /**
   * 底部是否局右，布局为 vertical 时起作用
   */
  footerVisible?: boolean
  fixedFooter?: boolean
  footerHeight?: number

  maxZIndex?: number
}
