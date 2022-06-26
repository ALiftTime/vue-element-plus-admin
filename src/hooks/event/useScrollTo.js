/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-18 09:50:08
 * @LastEditors: BG
 * @LastEditTime: 2022-06-18 09:58:02
 */
import { ref, unref } from 'vue'

/**
 *
 * @param {number} t
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @returns
 */
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}
/**
 *
 * @param {HTMLElement} el
 * @param {string} position
 * @param {number} amount
 */
const move = (el, position, amount) => {
  el[position] = amount
}


export function useScrollTo({
  el,
  position = 'scrollLeft',
  to,
  duration = 500,
  callback
}) {
  const isActiveRef = ref(false)
  const start = el[position]
  const change = to - start
  const increment = 20
  let currentTime = 0

  function animateScroll() {
    if (!unref(isActiveRef)) {
      return
    }
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(el, position, val)
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll)
    } else {
      if (callback) {
        callback()
      }
    }
  }

  function run() {
    isActiveRef.value = true
    animateScroll()
  }

  function stop() {
    isActiveRef.value = false
  }

  return { start: run, stop }
}
