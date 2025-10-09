import { camelCase, upperFirst } from 'lodash-es'

/**
 * 将字符串转为 PascalCase 写法
 */
export const pascalCase = (str: string) => {
  return upperFirst(camelCase(str))
}
