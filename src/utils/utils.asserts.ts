/**
 * 如果传入的值是null 或 undefined 抛出异常
 * @param value
 * @param message
 */
export function assertIsNonNullish<T>(
  value: T,
  message: string
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw Error(message);
  }
}

/**
 * 是否是object 不是则抛出异常
 * @param value
 * @param message
 */

export function assertIsObject<T>(
  value: T,
  message: string
): asserts value is T & object {
  if (typeof value !== "object") {
    throw Error(message);
  }
}
