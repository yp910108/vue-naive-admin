interface SessionStorage {
  settings?: Settings.Settings
}

const createSessionStorage = <T extends SessionStorage>() => {
  const set = <K extends keyof T>(key: K, value: T[K]) => {
    const str = JSON.stringify(value)
    sessionStorage.setItem(key as string, str)
  }

  const get = <K extends keyof T>(key: K) => {
    const str = sessionStorage.getItem(key as string)
    if (str) {
      try {
        return JSON.parse(str) as T[K]
      } catch (e) {
        // do nothing
      }
    }
    remove(key)
  }

  const remove = (key: keyof T) => {
    sessionStorage.removeItem(key as string)
  }

  const clear = () => {
    sessionStorage.clear()
  }

  return { set, get, remove, clear }
}

export const sessionStg = createSessionStorage()
