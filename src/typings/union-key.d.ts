declare namespace UnionKey {
  type ContentType =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'

  /**
   * 布局模式
   * - vertical 左侧菜单模式
   * - horizontal 顶部菜单模式
   * - vertical-mix 左侧菜单混合模式
   * - horizontal-mix 顶部菜单混合模式
   */
  type ThemeLayoutMode = 'vertical' | 'horizontal' | 'vertical-mix' | 'horizontal-mix'

  /**
   * 内容溢出时的出现滚动条的方式
   * - wrapper 布局组件最外层的元素出现滚动条
   * - content 主体内容组件出现滚动条
   */
  type ThemeScrollMode = 'wrapper' | 'content'

  /**
   * 多页签风格
   * - chrome 谷歌风格
   * - button 按钮风格
   */
  type ThemeTabMode = 'chrome' | 'button'

  /**
   * 水平模式的菜单位置
   * - flex-start 居左
   * - center 居中
   * - flex-end 居右
   */
  type ThemeHorizontalMenuPosition = 'flex-start' | 'center' | 'flex-end'

  /**
   * 过渡动画类型
   * - fade-slide: 滑动
   * - fade: 消退
   * - fade-bottom: 底部消退
   * - fade-scale: 缩放消退
   * - zoom-fade: 渐变
   * - zoom-out: 闪现
   */
  type ThemeAnimateMode =
    | 'fade-slide'
    | 'fade'
    | 'fade-bottom'
    | 'fade-scale'
    | 'zoom-fade'
    | 'zoom-out'
}
