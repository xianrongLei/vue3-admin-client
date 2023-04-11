export type AwaitToResult = [Record<string, any> | null, any];

/**
 * @param {Promise} promise
 * @return {Promise} Promise
 */
export const to = (promise: Promise<any>): Promise<any> =>
  promise.then((data) => [null, data]).catch((err) => [err, undefined]);
export const awaitTo = (
  promise: Promise<unknown>,
  errorExt?: Record<string, any>
): Promise<AwaitToResult> =>
  promise
    .then((data) => [null, data])
    .catch((err) => [
      errorExt ? { ...errorExt, ...err } : err,
      null
    ]) as Promise<AwaitToResult>;
