import { defineConfig } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/layouts/basic-layout/hooks.ts'
      ],
      exclude: ['node_modules', 'dist']
    }
  },
  shortcuts: {
    'flex-col': 'flex flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-center': 'flex-x-center flex-y-center',
    'flex-col-x-center': 'flex-col flex-y-center',
    'flex-col-y-center': 'flex-col flex-x-center',
    'flex-col-center': 'flex-col-x-center flex-col-y-center'
  }
})
