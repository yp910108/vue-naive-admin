import { VitePWA } from 'vite-plugin-pwa'

export default () => {
  return VitePWA({
    registerType: 'autoUpdate'
  })
}
