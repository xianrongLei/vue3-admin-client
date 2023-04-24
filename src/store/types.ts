import { CacheType } from "@/utils/cache-operator";

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
/**
 * Global “State Operator” input options type
 */
export interface UseStateOperatorInput<State, V> {
  /** State key type */
  key: keyof State;
  /** State value type */
  value?: State[V & keyof State];
}
declare module "pinia" {
  // eslint-disable-next-line no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    cache?: Cache<S>;
  }
}
