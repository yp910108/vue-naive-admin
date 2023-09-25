import { isObject } from './typeof'

export type OptionWithKey<K> = { value: K; label: string }

export function transformObjectToOption<T extends Record<string, any>>(obj: T) {
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label
  })) as OptionWithKey<keyof T>[]
}

/**
 * 去除对象中为 falsy（包含空数组）的值
 * @param obj
 */
export function transformObjectFalsy<T extends Record<string, any>>(obj: T) {
  const result: Record<string, any> = {}
  for (const key of Object.keys(obj)) {
    const val = obj[key]
    if (isObject(val)) {
      const _val = transformObjectFalsy(val)
      if (Object.keys(_val).length) {
        result[key] = _val
      }
    } else if (Array.isArray(val)) {
      const _val: any[] = []
      for (const item of val) {
        const _item = transformObjectFalsy(item)
        if (_item && Object.keys(_item).length) {
          _val.push(_item)
        }
      }
      if (_val.length) {
        result[key] = _val
      }
    } else if (val || val === 0) {
      result[key] = val
    }
  }
  return result as T
}
