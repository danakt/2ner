/* eslint-disable space-before-function-paren */

/**
 * Creates wrapper for throttling a function
 * @param time Delay time
 * @param fn Any function for throttle
 * @return Wrapper of function
 */
export function throttle<T extends (...a: any[]) => any>(this: any, time: number, fn: T): T {
  let canRun: boolean = true;

  const ret = (...args: any[]) => {
    if (!canRun) {
      return;
    }

    canRun = false;

    setTimeout(() => {
      canRun = true;
    }, time);

    return fn.apply(this, args);
  };

  return ret as T;
}
