const Utils = {};

Utils.px = val => `${val}px`;

Utils.constrain = (val, min, max) => {
  if (val <= min) {
    return min;
  } else if (val >= max) {
    return max;
  }
  return val;
}
export default Utils;