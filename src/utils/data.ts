export const parseString = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

export const toFixed = (num: number, digits?: number) => {
  return +num.toFixed(digits ?? 2)
}

export const isValidValue = <T>(value: T) => {
  return value || value === 0 || value === false
}
