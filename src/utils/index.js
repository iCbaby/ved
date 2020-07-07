/**
 * Shallow copy obj
 * @param {obj}
 */
export function copyObj (obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]' || Array.isArray(obj)) {
    return JSON.parse(JSON.stringify(obj))
  } else {
    throw new Error('不是对象')
  }
}
