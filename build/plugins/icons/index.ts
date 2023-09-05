import { PluginOption } from 'vite'
import type { Options } from './typing'
import { runSvg } from './run-svg'

/**
 * https://docs.iconify.design/articles/cleaning-up-icons/#parsing-an-entire-icon-set
 * https://docs.iconify.design/tools/tools2/export/json.html
 */

/**
 * 压缩、生成 Icon 组件
 * @param options
 * - parseColor 是否去除颜色（将颜色转化为 currentColor）
 */
export default function icons(options: Options = {}): PluginOption {
  const { source = 'src/icons', dts = 'src/typings/icon.d.ts', prefix = 'icon', ...rest } = options
  return {
    name: 'icon',
    async handleHotUpdate({ file }) {
      if (file.includes('src/icons') && file.endsWith('.svg')) {
        runSvg({ source, dts, prefix, ...rest })
      }
    },
    buildStart() {
      runSvg({ source, dts, prefix, ...rest })
    }
  }
}
