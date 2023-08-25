import { transformObjectToOption } from '@/utils'
import jsonSetting from './theme.json'

const themeLayoutModeLabels: Record<UnionKey.ThemeLayoutMode, string> = {
  vertical: '左侧菜单模式',
  horizontal: '顶部菜单模式',
  'vertical-mix': '左侧菜单混合模式',
  'horizontal-mix': '顶部菜单混合模式'
}
const themeLayoutModeOptions = transformObjectToOption(themeLayoutModeLabels)

const themeScrollModeLabels: Record<UnionKey.ThemeScrollMode, string> = {
  wrapper: '外层滚动',
  content: '主题滚动'
}
const themeScrollModeOptions = transformObjectToOption(themeScrollModeLabels)

const themeTabModeLabels: Record<UnionKey.ThemeTabMode, string> = {
  chrome: '谷歌风格',
  button: '按钮风格'
}
const themeTabModeOptions = transformObjectToOption(themeTabModeLabels)

const themeHorizontalMenuPositionLabels: Record<UnionKey.ThemeHorizontalMenuPosition, string> = {
  'flex-start': '居左',
  center: '居中',
  'flex-end': '居右'
}
const themeHorizontalMenuPositionOptions = transformObjectToOption(
  themeHorizontalMenuPositionLabels
)

const themeAnimateModeLabels: Record<UnionKey.ThemeAnimateMode, string> = {
  'zoom-fade': '渐变',
  'zoom-out': '闪现',
  'fade-slide': '滑动',
  fade: '消退',
  'fade-bottom': '底部消退',
  'fade-scale': '缩放消退'
}
const themeAnimateModeOptions = transformObjectToOption(themeAnimateModeLabels)

const themeColorList = [
  '#1890ff',
  '#409EFF',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#646cff',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#34C759',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#78DEC7',
  '#e53935',
  '#d81b60',
  '#f4511e',
  '#fb8c00',
  '#ffb300',
  '#fdd835',
  '#6d4c41',
  '#546e7a'
]

const defaultThemeSetting: Theme.Setting = {
  darkMode: false,
  followSystemTheme: true,
  isCustomizeDarkModeTransition: false,
  layout: {
    minWidth: 900,
    mode: 'vertical',
    modeList: themeLayoutModeOptions
  },
  scrollMode: 'content',
  scrollModeList: themeScrollModeOptions,
  themeColor: themeColorList[6],
  themeColorList,
  otherColor: {
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  },
  isCustomizeInfoColor: false,
  fixedHeaderAndTab: true,
  showReload: true,
  header: {
    inverted: false,
    height: 56,
    crumb: {
      visible: true,
      showIcon: true
    }
  },
  tab: {
    visible: true,
    height: 44,
    mode: 'chrome',
    modeList: themeTabModeOptions,
    isCache: true
  },
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 80,
    mixCollapsedWidth: 48,
    mixChildMenuWidth: 200
  },
  menu: {
    horizontalPosition: 'flex-start',
    horizontalPositionList: themeHorizontalMenuPositionOptions
  },
  footer: {
    visible: true,
    fixed: false,
    right: true,
    height: 48,
    inverted: false
  },
  page: {
    animate: true,
    animateMode: 'fade-slide',
    animateModeList: themeAnimateModeOptions
  }
}

export const themeSetting = (jsonSetting as Theme.Setting) ?? defaultThemeSetting
