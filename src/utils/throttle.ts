/* eslint-disable space-before-function-paren */
import { curry } from 'ramda'

/**
 * Creates wrapper for throttling a function
 * @param time Delay time
 * @param fn Any function for throttle
 */
export const throttle = curry(function<T extends (...a: any[]) => any>(
  this: any,
  time: number,
  fn: T
): T {
  let canRun: boolean = true

  const ret = (...args: any[]) => {
    if (!canRun) {
      return
    }

    canRun = false

    setTimeout(() => {
      canRun = true
    }, time)

    return fn.apply(this, args)
  }

  return ret as T
})
