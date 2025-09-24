export const toRawType = (val: any) => {
  return Object.prototype.toString.call(val).slice(8, -1)
}

export const isObject = <T extends Record<string, any>>(value: T | unknown): value is T => {
  return toRawType(value) === 'Object'
}

export const isFile = <T extends File>(value: T | unknown): value is T => {
  return toRawType(value) === 'File'
}
