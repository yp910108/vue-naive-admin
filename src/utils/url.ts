import { REGEXP_URL } from '@/constants'

export const isExternal = (path: string): boolean => {
  return REGEXP_URL.test(path)
}

export const combineURL = (...urls: (string | undefined)[]) => {
  const ret = urls.map((url) => {
    if (!url) return url
    if (isExternal(url)) {
      return url.replace(/\/+$/, '')
    } else {
      return url.replace(/^\/+/, '').replace(/\/+$/, '')
    }
  })
  return ret.filter((r) => r).join('/')
}
