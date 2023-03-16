export interface GetCacheOptions {
  key: string
  type?: "local" | "session" | undefined
}
export interface SetCacheOptions extends GetCacheOptions {
  value: any
}
export interface ClearCacheOptions extends GetCacheOptions {}

export interface CacheType {
  local: "localStorage"
  session: "sessionStorage"
  defaultType: "session"
}

const cacheType = {
  local: "localStorage",
  session: "sessionStorage",
  defaultType: "session"
} as any
/**
 * 获取浏览器缓存
 * @param { String } key any
 * @param { String } type local | session
 * getCache({ key: "name", value: "jike" })
 */
export const getCache = ({ key, type }: GetCacheOptions) =>
  JSON.parse(window[cacheType[type || cacheType.defaultType]].getItem(key))

/**
 * 设置浏览器缓存
 * @param { String } key any
 * @param { String } value any
 * @param { String } type local | session
 * setCache({ key: "name", value: "jike", type: "local" | "local" })
 */
export const setCache = ({ key, value, type }: SetCacheOptions) => {
  window[cacheType[type || cacheType.defaultType]].setItem(
    key,
    JSON.stringify(value)
  )
}

/**
 * 清除缓存
 * @param { Array | Object } keys [{ key: xxx, type: xxx }] | { key: xxx, type: xxx }
 * clearCache({ key: "name", type: "local" | "local" } | [{ key: "name", type: "local" | "local" }])
 */
export const clearCache = (params: ClearCacheOptions[] | ClearCacheOptions) => {
  if (params.constructor === Object) {
    window[
      cacheType[(<ClearCacheOptions>params).type || cacheType.defaultType]
    ].removeItem((<ClearCacheOptions>params).key)
  } else {
    ;(<ClearCacheOptions[]>params).forEach(
      ({ type, key }: ClearCacheOptions) => {
        window[cacheType[type || cacheType.defaultType]].removeItem(key)
      }
    )
  }
}

/**
 * 清除session或local中的所有缓存
 * @param { String } type
 * clearAll("local" | "local")
 */
export const clearAll = (type: string) => {
  window[cacheType[type || cacheType.defaultType]].clear()
}
