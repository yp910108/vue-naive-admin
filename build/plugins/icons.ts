import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function icons() {
  return createSvgIconsPlugin({
    // don't use `src/icons` directly, it will effect the `symbolId`
    iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    symbolId: '[name]',
    inject: 'body-last',
    customDomId: '__SVG_ICON__'
  })
}
