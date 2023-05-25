import type { Cache } from "./plugin/plugin.types";

declare module "pinia" {
  // eslint-disable-next-line no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    cache?: Cache<S>;
  }
}
