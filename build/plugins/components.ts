import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default Components({
  dts: 'src/typings/components.d.ts',
  dirs: ['src/components', 'src/icons/components'],
  extensions: ['vue', 'tsx'],
  resolvers: [NaiveUiResolver()]
})
