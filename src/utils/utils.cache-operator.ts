export type CacheTypes = {
  local: "localStorage";
  session: "sessionStorage";
};
export type CacheType = keyof CacheTypes;
const cacheTypes: CacheTypes = {
  local: "localStorage",
  session: "sessionStorage"
};
const defaultCacheType: CacheType = "session";
export type Options = {
  key: string;
  type?: CacheType;
};

/**
 * 获取浏览器缓存
 * @param { Options | string } options
 */
// eslint-disable-next-line no-unused-vars
export function getCache(options: Options | string): unknown;
// eslint-disable-next-line no-redeclare
export function getCache(options: unknown) {
  if (typeof options === "string") {
    return JSON.parse(window[cacheTypes[defaultCacheType]].getItem(options) as string);
  }
  const { type, key } = options as Options;
  return JSON.parse(window[cacheTypes[type || defaultCacheType]].getItem(key) as string);
}

/**
 * 设置浏览器缓存
 * @param { Options } options
 */
export function setCache<T>(
  options: Options & {
    value: T;
  }
): void {
  const { key, type, value } = options;
  window[cacheTypes[type || defaultCacheType]].setItem(key, JSON.stringify(value));
}

/**
 * 清除缓存
 * @param { Options | Options[] } options
 */
// eslint-disable-next-line no-unused-vars
export function clearCache(options: Options | Options[]): void;
// eslint-disable-next-line no-redeclare
export function clearCache(options: unknown): void {
  if (typeof options === "string") {
    window[cacheTypes[defaultCacheType]].removeItem(options);
  } else if (typeof options === "object") {
    const { type, key } = options as Options;
    window[cacheTypes[type || defaultCacheType]].removeItem(key);
  } else {
    const arr = options as Options[];
    arr.forEach(({ type, key }: Options) => {
      window[cacheTypes[type || defaultCacheType]].removeItem(key);
    });
  }
}

/**
 * 清除session或local中的所有缓存
 * @param { CacheType } type
 * clearAll("local" | "local")
 */
export function clearAll(type?: CacheType): void {
  window[cacheTypes[type || defaultCacheType]].clear();
}
