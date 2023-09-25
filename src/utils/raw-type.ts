/**
 * 获取原始类型的值
 * @param val
 */
export function toRawType(val: any) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
