import type { CacheType } from "@/utils/utils.cache-operator";

/**
 * Store cache item
 */
export type CacheItem = {
  /** Cache type , local or session */
  type: CacheType;
  /** Default value */
  default: unknown;
  /**
   * 在监听state之前调用
   * @param cache state缓存的值
   * @returns
   */
  // eslint-disable-next-line no-unused-vars
  init?: (cache: unknown) => void;
};

export type Cache<T> = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof T]?: CacheItem;
};
declare module "pinia" {
  // eslint-disable-next-line no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    cache?: Cache<S>;
  }
}
