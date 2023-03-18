export type local = "local"
export type session = "session"
export type GetOptions = {
  key: string
  type?: local | session
}
export type SetOptions = GetOptions & {
  value: string
}
export type ClearOptions = GetOptions & string

const cacheType = {
  local: "localStorage",
  session: "sessionStorage"
} as const
const defaultCacheType: local = "local"
/**
 * 获取浏览器缓存
 * @param { Object } params
 */
// eslint-disable-next-line no-unused-vars
export function getCache(params: GetOptions | string): unknown
// eslint-disable-next-line no-redeclare
export function getCache(params: unknown): unknown {
  if (typeof params === "string") {
    const key = params as string
    return JSON.parse(<string>window[cacheType[defaultCacheType]].getItem(key))
  }
  const { type, key } = params as GetOptions
  return JSON.parse(
    <string>window[cacheType[type || defaultCacheType]].getItem(key)
  )
}

/**
 * 设置浏览器缓存
 * @param { Object } { key, value, type }
 */
export function setCache({ key, value, type }: SetOptions): void {
  window[cacheType[type || defaultCacheType]].setItem(
    key,
    JSON.stringify(value)
  )
}

/**
 * 清除缓存
 * @param { Array | Object } params
 */
// eslint-disable-next-line no-unused-vars
export function clearCache(params: ClearOptions | ClearOptions[] | string): void
// eslint-disable-next-line no-redeclare
export function clearCache(params: unknown): void {
  if (typeof params === "string") {
    const key: string = params as string
    window[cacheType[defaultCacheType]].removeItem(key)
  } else if (typeof params === "object") {
    const { type, key }: ClearOptions = <ClearOptions>params
    window[cacheType[type || defaultCacheType]].removeItem(key)
  } else {
    const arr: ClearOptions[] = <ClearOptions[]>params
    arr.forEach(({ type, key }: ClearOptions) => {
      window[cacheType[type || defaultCacheType]].removeItem(key)
    })
  }
}

/**
 * 清除session或local中的所有缓存
 * @param { String } type
 * clearAll("local" | "local")
 */
export function clearAll(type?: local | session): void {
  window[cacheType[type || defaultCacheType]].clear()
}
