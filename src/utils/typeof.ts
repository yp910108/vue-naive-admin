/**
 * 获取原始类型的值
 * @param val
 */
export function toRawType(val: any) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function isObject<T extends Record<string, any>>(value: T | unknown): value is T {
  return toRawType(value) === 'Object'
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return toRawType(value) === 'File'
}
