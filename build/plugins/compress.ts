import ViteCompression from 'vite-plugin-compression'

export default () => {
  return ViteCompression({
    algorithm: 'gzip'
  })
}
