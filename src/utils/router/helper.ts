import { camelize } from '../common'

/**
 * /login/:module => /login
 * @param path
 */
export function removeParamsFromPath(path: string) {
  return path.split('/:')[0]
}

/**
 * 通过路径获取组件名称
 * @param path
 */
export function parsePathToName(path: string) {
  return camelize(removeParamsFromPath(path).replace(/\//g, '-'), true)
}
