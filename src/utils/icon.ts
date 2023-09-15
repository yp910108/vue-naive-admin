import { h, type FunctionalComponent, type StyleValue } from 'vue'
import { Icon } from '@iconify/vue'
import ids from 'virtual:svg-icons-names'

export interface IconProps {
  icon: string
  fontSize?: number
  color?: string
}

export const IconRender: FunctionalComponent<IconProps> = (props) => {
  const { icon, fontSize, color } = props

  const style: StyleValue = {}

  if (!icon) {
    console.warn('没有传递图标名称，请确保给 icon 传递有效值！')
  }

  if (color) {
    style.color = color
  }

  if (fontSize) {
    style.fontSize = `${fontSize}px`
  }

  if (ids.includes(icon)) {
    return h(
      'svg',
      {
        'aria-hidden': true,
        width: '1em',
        height: '1em',
        style
      },
      h('use', {
        'xlink:href': `#${icon}`,
        fill: 'currentColor'
      })
    )
  } else {
    return h(Icon, { icon, style })
  }
}

IconRender.props = ['icon', 'fontSize', 'color']
