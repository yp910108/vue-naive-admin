/**
 * @param path
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 拼接 url
 * @param urls
 */
export function combineURL(...urls: string[]) {
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
