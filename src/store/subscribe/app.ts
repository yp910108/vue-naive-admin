import { watch } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useAppStore } from '../modules'

export default function subscribeAppStore() {
  const { isFullscreen, toggle } = useFullscreen()

  const appStore = useAppStore()

  const update = () => {
    if (appStore.contentFull && !isFullscreen.value) {
      toggle()
    } else if (!appStore.contentFull && isFullscreen.value) {
      toggle()
    }
  }

  watch(
    () => appStore.contentFull,
    () => {
      update()
    }
  )

  watch(isFullscreen, (newValue) => {
    if (!newValue) {
      appStore.setContentFull(false)
    }
  })
}
