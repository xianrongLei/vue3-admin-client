/**
 * @param {Promise} promise
 * @return {Promise} Promise
 */
export type AwaitToResult = Promise<[Record<string, any> | null, Record<string, any> | null]>;

export const awaitTo = (
  promise: Promise<unknown> | any,
  extantErr?: Record<string, any>
  // eslint-disable-next-line arrow-body-style
): AwaitToResult => {
  if (!(promise instanceof Promise)) {
    throw new Error("Parameter one must be a promise!");
  }
  return promise
    .then((data) => [null, data || { data }])
    .catch((err) => {
      const sourceErr = typeof err === "object" ? err : { message: err };
      const Err = extantErr ? { ...extantErr, ...sourceErr } : { ...sourceErr };
      return [Err, null];
    }) as AwaitToResult;
};
