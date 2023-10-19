import { isObject } from './typeof'

export type OptionWithKey<K> = { value: K; label: string }

export function transformObjectToOption<T extends Record<string, any>>(obj: T) {
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label
  })) as OptionWithKey<keyof T>[]
}

export function transformOptionToKeyValue(option?: OptionWithKey<string>[]) {
  return option?.reduce(
    (prev, curr) => {
      prev[curr.value] = curr.label
      return prev
    },
    {} as Record<string, string>
  )
}

/**
 * 去除对象/数组中的无效值。注意：{}（空对象）和 []（空数组）也会被去除
 * @param source
 */
export function removeInvalidValues<T>(source: T) {
  if (isObject(source)) {
    const result: Record<string, any> = {}
    for (const key of Object.keys(source)) {
      const _val = removeInvalidValues((source as any)[key])
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
  } else if (Array.isArray(source)) {
    const result: any[] = []
    for (const item of source) {
      const _item = removeInvalidValues(item)
      if (_item) {
        result.push(_item)
      }
    }
    return result.length ? (result as T) : undefined
  } else {
    return source || source === 0 || source === false ? source : undefined
  }
}
