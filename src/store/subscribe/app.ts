import { watch } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useAppStore } from '../modules'

export default function subscribeAppStore() {
  const { isFullscreen, toggle } = useFullscreen()

  const app = useAppStore()

  const update = () => {
    if (app.contentFull && !isFullscreen.value) {
      toggle()
    } else if (!app.contentFull && isFullscreen.value) {
      toggle()
    }
  }

  watch(
    () => app.contentFull,
    () => {
      update()
    }
  )

  watch(isFullscreen, (newValue) => {
    if (!newValue) {
      app.setContentFull(false)
    }
  })
}
