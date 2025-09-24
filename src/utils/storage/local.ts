interface LocalStorage {
  token?: string
  userInfo?: Auth.UserInfo
  lang?: Lang.Type
  theme?: 'light' | 'dark'
  tabs?: Tab.MultiTab[]
}

interface StorageData<T> {
  value: T
  expire?: number
}

const createLocalStorage = <T extends LocalStorage>() => {
  const DEFAULT_EXPIRE = 7 * 24 * 60 * 60

  /**
   * @param key
   * @param value
   * @param expire 如果不传默认 7 天，传 0 为永久
   */
  const set = <K extends keyof T>(key: K, value: T[K], expire?: number) => {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire ?? Date.now() + DEFAULT_EXPIRE * 1000
    }
    const str = JSON.stringify(storageData)
    localStorage.setItem(key as string, str)
  }

  const get = <K extends keyof T>(key: K) => {
    const str = localStorage.getItem(key as string)
    if (str) {
      try {
        const storageData: StorageData<T[K]> = JSON.parse(str)
        if (storageData) {
          const { value, expire } = storageData
          if (!expire || expire > Date.now()) {
            return value
          }
        }
      } catch (e) {
        // do nothing
      }
    }
    remove(key)
  }

  const remove = (key: keyof T) => {
    localStorage.removeItem(key as string)
  }

  const clear = () => {
    localStorage.clear()
  }

  return { set, get, remove, clear }
}

export const localStg = createLocalStorage()
