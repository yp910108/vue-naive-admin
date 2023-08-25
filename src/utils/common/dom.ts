const requestAnimFrame =
  window.requestAnimationFrame ??
  function requestAnimFrame(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

function easingFun(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) {
    return (c / 2) * t * t + b
  }
  return (-c / 2) * (--t * (t - 2) - 1) + b
}

/**
 * 滚动页面到指定位置
 * @param el
 * @param to
 * @param duration
 */
export function scrollTo(el: Element, to = 0, duration = 500) {
  const { scrollTop } = el
  const startTime = Date.now()
  function scroll() {
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
