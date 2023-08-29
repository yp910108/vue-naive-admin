import { promises as fs } from 'fs'
import { PluginOption } from 'vite'
import { compareColors, stringToColor } from '@iconify/utils/lib/colors'
import { importDirectory, cleanupSVG, parseColors, isEmptyColor, runSVGO } from '@iconify/tools'
import {
  generateComponentStr,
  generateComponentNameTypeStr,
  generateImportStr,
  generateNameTypeStr,
  generateTypeStrs
} from './utils'
import type { Prefix, Exported } from './typing'
import { exclude } from './exclude'

// https://docs.iconify.design/articles/cleaning-up-icons/#parsing-an-entire-icon-set
// https://docs.iconify.design/tools/tools2/export/json.html
export default function icon(): PluginOption {
  return {
    name: 'icon',
    async buildStart() {
      const source = 'src/icons'
      const dts = 'src/typings/icon.d.ts'
      const prefix: Prefix = 'icon'
      const iconSet = await importDirectory(source, { prefix })
      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon') return
        const svg = iconSet.toSVG(name)
        if (!svg) {
          iconSet.remove(name)
          return
        }
        if (exclude.includes(name)) return
        try {
          cleanupSVG(svg)
          const whiteColor = stringToColor('white')
          await parseColors(svg, {
            defaultColor: 'currentColor',
            callback: (_, colorStr, color) => {
              return !color || isEmptyColor(color) || compareColors(color, whiteColor!)
                ? colorStr
                : 'currentColor'
            }
          })
          runSVGO(svg)
        } catch (err) {
          console.error(`Error parsing ${name}:`, err)
          iconSet.remove(name)
          return
        }
        iconSet.fromSVG(name, svg)
      })
      const exported = iconSet.export() as Exported
      const { icons, width, height } = exported
      let importStrs = ''
      let componentNameTypeStrs = ''
      let nameTypeStrs = ''
      for (const key of Object.keys(icons)) {
        const icon = icons[key]
        const str = generateComponentStr(prefix, key, icon, width, height)
        importStrs += generateImportStr(prefix, key)
        componentNameTypeStrs += generateComponentNameTypeStr(prefix, key)
        nameTypeStrs += generateNameTypeStr(key)
        await fs.writeFile(`${source}/components/${prefix}-${key}.tsx`, str, 'utf8')
      }
      const typeStrs = generateTypeStrs(componentNameTypeStrs, nameTypeStrs)
      await fs.writeFile(`${source}/index.ts`, importStrs, 'utf8')
      await fs.writeFile(dts, typeStrs, 'utf8')
    }
  }
}
