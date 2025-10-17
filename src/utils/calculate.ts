type Operation = 'add' | 'sub' | 'mult' | 'divi'

type Calculation = Record<Operation, (multiple: number, ...args: number[]) => number>

const calculation: Calculation = {
  add(multiple, ...args) {
    let result = 0
    args.forEach((num) => {
      result += Math.round(+num * multiple)
    })
    return result / multiple
  },
  sub(multiple, ...args) {
    let result = Math.round(+args.shift()! * multiple)
    args.forEach((num) => {
      result -= Math.round(+num * multiple)
    })
    return result / multiple
  },
  mult(multiple, ...args) {
    let result = 1
    args.forEach((num) => {
      result *= Math.round(+num * multiple)
    })
    return result / multiple ** args.length
  },
  divi(multiple, ...args) {
    let result = Math.round(+args.shift()! * multiple)
    args.forEach((num) => {
      result /= Math.round(+num * multiple)
    })
    return result
  }
}

/**
 * 浮点数进行计算
 * @param type
 * @param args
 */
export function calculate(type: Operation, ...args: number[]) {
  if (!args.length) return 0
  // 表示小数点后几位
  let figures = 0
  args.forEach((num) => {
    const decimal = `${num}`.split('.')[1]
    if (!decimal) return
    figures = decimal.length > figures ? decimal.length : figures
  })
  return calculation[type](10 ** figures, ...args)
}
