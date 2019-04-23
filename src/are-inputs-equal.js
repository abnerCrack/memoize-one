// @flow
// 输入相等
export default function areInputsEqual(
  // 新输入
  newInputs: mixed[],
  // 最后一次输入
  lastInputs: mixed[],
) {
  // no checks needed if the inputs length has changed
  // 新旧两次长度不等直接返回false
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  // Using for loop for speed. It generally performs better than array.every
  // https://github.com/alexreardon/memoize-one/pull/59
  // 遍历所有参数有一个不相等就返回false
  for (let i = 0; i < newInputs.length; i++) {
    // using shallow equality check
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  // 长度参数都相等，说明就是上次那个值
  return true;
}
