/**
 * @param {Promise} promise
 * @return {Promise} 返回一个Promise
 */
// export const to = (promise: Promise<any>): Promise<any> =>
//   promise.then(data => [null, data]).catch(err => [err, undefined])
export const to = (promise: Promise<any>, errorExt?: object): Promise<any> =>
  promise
    .then(data => [null, data])
    .catch(err => {
      let parsedError = null
      if (errorExt) {
        parsedError = { ...err, ...errorExt }
        return [parsedError, undefined]
      }
      return [err, undefined]
    })
