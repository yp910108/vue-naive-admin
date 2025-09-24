import { isObject } from './typeof'
import { isValidValue } from './data'

export const transformOptionToValueLabel = (
  option?: Record<string, any>[],
  props?: { valueField?: string; labelField?: string }
) => {
  props = { valueField: 'value', labelField: 'label', ...props }
  return option?.reduce(
    (prev, curr) => {
      prev[(curr as any)[props.valueField!]] = (curr as any)[props.labelField!]
      return prev
    },
    {} as Record<string, string | undefined>
  )
}

export const transformValueLabelToOption = (valueLabel: Record<string, any>) => {
  return Object.entries(valueLabel).map(([value, label]) => ({ value, label }))
}

/**
 * 去除对象/数组中的无效值。注意：{}（空对象）和 []（空数组）也会被去除
 * @param source
 */
export const removeInvalidValues = <T>(source: T) => {
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
        if (isValidValue(_val)) {
          result[key] = _val
        }
      }
    }
    return Object.keys(result).length ? (result as T) : undefined
  } else if (Array.isArray(source)) {
    const result: any[] = []
    for (const item of source) {
      const _item = removeInvalidValues(item)
      if (isValidValue(_item)) {
        result.push(_item)
      }
    }
    return result.length ? (result as T) : undefined
  } else {
    return isValidValue(source) ? source : undefined
  }
}
