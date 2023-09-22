import type { LayoutProps } from './typings'

export function createLayoutCssVars(props: LayoutProps) {
  const maxZIndex = props.maxZIndex!
  const siderZIndex = props.mode === 'vertical' || props.isMobile ? maxZIndex - 1 : maxZIndex - 4
  const mobileSiderZIndex = props.isMobile ? maxZIndex - 2 : 0
  const headerZIndex = maxZIndex - 3
  const tabZIndex = maxZIndex - 5
  const footerZIndex = maxZIndex - 5
  return {
    '--sider-z-index': siderZIndex,
    '--mobile-sider-z-index': mobileSiderZIndex,
    '--sider-width': `${props.siderWidth}px`,
    '--sider-collapsed-width': `${props.siderCollapsedWidth}px`,
    '--header-z-index': headerZIndex,
    '--header-height': `${props.headerHeight}px`,
    '--tab-z-index': tabZIndex,
    '--tab-height': `${props.tabHeight}px`,
    '--footer-z-index': footerZIndex,
    '--footer-height': `${props.footerHeight}px`
  }
}
