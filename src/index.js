// @flow
import areInputsEqual from './are-inputs-equal';
// 定义函数类型
export type EqualityFn = (newArgs: mixed[], lastArgs: mixed[]) => boolean;

// <ResultFn: (...any[]) => mixed>
// The purpose of this typing is to ensure that the returned memoized
// function has the same type as the provided function (`resultFn`).
// ResultFn:        Generic type (which is the same as the resultFn).
// (...any[]): Accepts any length of arguments - and they are not checked
// mixed:           The result can be anything but needs to be checked before usage
export default function<ResultFn: (...any[]) => mixed>(
  // 纯函数(计算函数)
  resultFn: ResultFn,
  // 是否相等,调用对比函数
  isEqual?: EqualityFn = areInputsEqual,
): ResultFn {
  // 定义最后一次的this
  let lastThis: mixed;
  // 定义最后一次的参数
  let lastArgs: mixed[] = [];
  // 定义最后一次的结果
  let lastResult: mixed;
  // 缓存标志位，判断是否进行过缓存
  let calledOnce: boolean = false;
  // 如果缓存过，并且this相等，并且参数不变，抛出缓存
  // breaking cache when context (this) or arguments change
  const result = function(...newArgs: mixed[]) {
    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    // Throwing during an assignment aborts the assignment: https://codepen.io/alexreardon/pen/RYKoaz
    // Doing the lastResult assignment first so that if it throws
    // nothing will be overwritten
    // 缓存上一次结果
    lastResult = resultFn.apply(this, newArgs);
    // 启用缓存标志位
    calledOnce = true;
    // 缓存this
    lastThis = this;
    // 最后一次参数就是当前传入参数
    lastArgs = newArgs;
    // 返回当前的结果(也是最后一次的值)
    return lastResult;
  };
  // 抛出函数
  return (result: any);
}
