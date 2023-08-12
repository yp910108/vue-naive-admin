const camelizeRE = /-(\w)/g

export function camelize(str: string, isPascalCase?: boolean) {
  str = str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
  if (isPascalCase) {
    str = `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
  }
  return str
}
