import { PiniaPluginContext } from "pinia";
import type { CacheType } from "@/utils/utils.cache-operator";

/**
 * Store cache item
 */
export type CacheItem<S, Store> = {
  /** Cache type , local or session */
  type: CacheType;
  /** Default value */
  default: unknown;
  /**
   * 在监听state之前调用
   * @param cache state缓存的值
   * @returns
   */
  beforeMounted?: (this: Store & PiniaPluginContext["store"], cache: unknown) => void;
  /**
   * 修改缓存的钩子
   * @param newValue
   * @param oldValue
   * @returns
   */
  onChange?: (newValue: unknown, oldValue: unknown) => void;
};
declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    cache?: {
      [key in keyof S]?: CacheItem<S, Store>;
    };
  }
}
