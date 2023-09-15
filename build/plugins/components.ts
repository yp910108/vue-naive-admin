import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default function components() {
  return Components({
    dirs: [],
    dts: 'src/typings/components.d.ts',
    resolvers: [NaiveUiResolver()]
  })
}
