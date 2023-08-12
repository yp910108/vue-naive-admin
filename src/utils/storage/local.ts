import { decrypto, encrypto } from '../crypto'

interface StorageData<T> {
  value: T
  expire?: number
}

function createLocalStorage<T extends StorageInterface.Local>() {
  const DEFAULT_EXPIRE = 7 * 24 * 60 * 60

  /**
   * @param key
   * @param value
   * @param expire 如果不传默认 7 天，传 0 为永久
   */
  function set<K extends keyof T>(key: K, value: T[K], expire?: number) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire ?? Date.now() + DEFAULT_EXPIRE * 1000
    }
    const json = encrypto(storageData)
    localStorage.setItem(key as string, json)
  }

  function get<K extends keyof T>(key: K) {
    const json = localStorage.getItem(key as string)
    if (json) {
      try {
        const storageData: StorageData<T[K]> = decrypto(json)
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

  function remove(key: keyof T) {
    localStorage.removeItem(key as string)
  }

  function clear() {
    localStorage.clear()
  }

  return { set, get, remove, clear }
}

export const localStg = createLocalStorage()
