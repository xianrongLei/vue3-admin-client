export type CacheTypes = {
  local: "localStorage";
  session: "sessionStorage";
};
const cacheTypes: CacheTypes = {
  local: "localStorage",
  session: "sessionStorage"
};
export type CacheType = keyof CacheTypes;

/**
 * 获取缓存
 * @param key
 * @param type
 * @returns
 */
export const getCache = (key: string, type: CacheType): unknown =>
  JSON.parse(window[cacheTypes[type]].getItem(key) as string);

/**
 * 设置缓存
 * @param key
 * @param value
 * @param type
 */
export const setCache = (key: string, value: unknown, type: CacheType): void => {
  window[cacheTypes[type]].setItem(key, JSON.stringify(value));
};

/**
 * 清除缓存
 * @param key
 * @param type
 */
export const clearCache = (key: string, type: CacheType): void => {
  window[cacheTypes[type]].removeItem(key);
};

/**
 * 清除所有缓存
 * @param { CacheType } type
 */
export const clearAll = (type: CacheType): void => {
  window[cacheTypes[type]].clear();
};
