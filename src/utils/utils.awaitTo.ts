/**
 * @param {Promise} promise
 * @return {Promise} Promise
 */

type ErrorObject = { message: string } & Record<string, any>;

export const awaitTo = async <T>(
  promise: Promise<T>,
  extantErr?: Record<string, any>
): Promise<[ErrorObject | null, T | null]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error: any) {
    const errorObject = { message: error.message, ...extantErr };
    return [errorObject, null];
  }
};
