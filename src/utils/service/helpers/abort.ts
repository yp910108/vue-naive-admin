import type { AxiosRequestConfig } from 'axios'

const controllers = new Set<AbortController>()

export const addController = (config: AxiosRequestConfig) => {
  const controller = new AbortController()
  config.signal = controller.signal
  controllers.add(controller)
}

export const abort = () => {
  for (const controller of controllers) {
    controller.abort()
  }
}
