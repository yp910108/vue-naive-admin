import { effectScope, onScopeDispose, watch } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useAppStore } from '../modules'

export default function subscribeAppStore() {
  const { isFullscreen, toggle } = useFullscreen()

  const app = useAppStore()

  const scope = effectScope()

  const update = () => {
    if (app.contentFull && !isFullscreen.value) {
      toggle()
    } else if (!app.contentFull && isFullscreen.value) {
      toggle()
    }
  }

  scope.run(() => {
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
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
