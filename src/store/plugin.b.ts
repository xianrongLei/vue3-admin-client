import "pinia";
import { CacheType } from "@/utils/cache-operator";

export type CacheItem = {
  /**
   * 那种类型缓存 local | session
   */
  type: CacheType;
  /**
   * state 的初始值
   */
  default: unknown;
};
export type Cache = Record<string, CacheItem>;

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    // 任意 action 都允许定义一个防抖的毫秒数
    getCacheAdvance?: CacheItem[];
    cache?: Cache;
  }
}
