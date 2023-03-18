export const assertIsNonNullish = <T>(
  value: T,
  message: string
): asserts value is NonNullable<T> => {
  if (value === null || value === undefined) {
    throw Error(message)
  }
}
