import { decrypto, encrypto } from '../crypto'

function createSessionStorage<T extends StorageInterface.Session>() {
  function set<K extends keyof T>(key: K, value: T[K]) {
    const json = encrypto(value)
    sessionStorage.setItem(key as string, json)
  }

  function get<K extends keyof T>(key: K) {
    const json = sessionStorage.getItem(key as string)
    if (json) {
      try {
        return decrypto(json) as T[K]
      } catch (e) {
        // do nothing
      }
    }
    remove(key)
  }

  function remove(key: keyof T) {
    sessionStorage.removeItem(key as string)
  }

  function clear() {
    sessionStorage.clear()
  }

  return { set, get, remove, clear }
}

export const sessionStg = createSessionStorage()
