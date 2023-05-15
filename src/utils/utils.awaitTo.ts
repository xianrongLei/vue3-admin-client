/**
 * @param {Promise} promise
 * @return {Promise} Promise
 */
export const to = (promise: Promise<any>): Promise<any> =>
  promise.then((data) => [null, data]).catch((err) => [err, undefined]);
// eslint-disable-next-line arrow-body-style
export const awaitTo = (promise: Promise<unknown>, errorExt?: Record<string, any>): Promise<[any, any]> => {
  return promise
    .then((data) => [null, data])
    .catch((err) => [errorExt ? { ...errorExt, ...err } : err, null]) as Promise<[any, any]>;
};
