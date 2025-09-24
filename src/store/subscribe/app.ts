import { watch } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useAppStore } from '../modules'

const subscribeAppStore = () => {
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
    () => update
  )

  watch(isFullscreen, (newValue) => {
    if (!newValue) {
      appStore.setContentFull(false)
    }
  })
}

export default subscribeAppStore
