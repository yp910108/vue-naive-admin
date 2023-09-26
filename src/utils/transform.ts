import { isObject } from './typeof'

export type OptionWithKey<K> = { value: K; label: string }

export function transformObjectToOption<T extends Record<string, any>>(obj: T) {
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label
  })) as OptionWithKey<keyof T>[]
}

/**
 * 去除对象中为 falsy 或空数组的值
 * @param obj
 */
export function transformObjectTruthy<T>(obj: T) {
  if (Array.isArray(obj)) {
    const result: any[] = []
    for (const item of obj) {
      const _item = transformObjectTruthy(item)
      if (_item) {
        result.push(_item)
      }
    }
    return result.length ? (result as T) : undefined
  } else if (isObject(obj)) {
    const result: Record<string, any> = {}
    for (const key of Object.keys(obj)) {
      const _val = transformObjectTruthy((obj as any)[key])
      if (isObject(_val)) {
        if (Object.keys(_val).length) {
          result[key] = _val
        }
      } else if (Array.isArray(_val)) {
        if (_val.length) {
          result[key] = _val
        }
      } else {
        if (_val || _val === 0) {
          result[key] = _val
        }
      }
    }
    return Object.keys(result).length ? (result as T) : undefined
  } else {
    return obj
  }
}
