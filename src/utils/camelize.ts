const camelizeRE = /-(\w)/g

/**
 * 将 - 转化为驼峰
 * @param str
 * @param isPascalCase 第一个字母是否大写
 */
export function camelize(str: string, isPascalCase?: boolean) {
  str = str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
  if (isPascalCase) {
    str = `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
  }
  return str
}
