const requestAnimFrame =
  window.requestAnimationFrame ??
  ((callback) => {
    window.setTimeout(callback, 1000 / 60)
  })

const easingFun = (t: number, b: number, c: number, d: number) => {
  if ((t /= d / 2) < 1) {
    return (c / 2) * t * t + b
  }
  return (-c / 2) * (--t * (t - 2) - 1) + b
}

export const scrollTo = (el: Element, to = 0, duration = 500) => {
  const { scrollTop } = el
  const startTime = Date.now()
  const scroll = () => {
    const currentTime = Date.now() - startTime
    const val = easingFun(currentTime, scrollTop, to - scrollTop, duration)
    el.scrollTop = val
    if (currentTime < duration) {
      requestAnimFrame(scroll)
    } else {
      if (val !== to) {
        el.scrollTop = to
      }
    }
  }
  scroll()
}
