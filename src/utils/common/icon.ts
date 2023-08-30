import { h, type FunctionalComponent, type StyleValue } from 'vue'
import * as icons from '@/icons'
import { camelize } from './camelize'

export interface IconProps {
  icon?: Icon.IconName
  fontSize?: number
  color?: string
}

export const IconRender: FunctionalComponent<IconProps> = (props) => {
  const { icon, fontSize, color } = props

  const iconName = (icon ? `Icon${camelize(icon, true)}` : '') as Icon.IconComponentName

  const style: StyleValue = {}

  if (!icon) {
    console.warn('没有传递图标名称，请确保给 icon 传递有效值！')
  } else if (!Object.keys(icons).includes(iconName)) {
    console.warn(`图标 ${icon} 不存在！`)
  }

  if (color) {
    style.color = color
  }

  if (fontSize) {
    style.fontSize = `${fontSize}px`
  }

  return h(icons[iconName], { style })
}

IconRender.props = ['icon', 'fontSize', 'color']
