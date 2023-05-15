import type { CacheType } from "@/utils/utils.cache-operator";
/**
 * Store cache item
 */
export type CacheItem = {
  /** Cache type , local or session */
  type: CacheType;
  /** Default value */
  default: unknown;
};

export type Cache<T> = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof T]?: CacheItem;
};
