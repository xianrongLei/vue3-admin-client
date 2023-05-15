import type { Cache } from "./plugin/plugin.types";
/**
 * Global “State Operator” input options type
 */
export type UseStateOperatorInput<State, Key> = {
  /** State key type */
  key: keyof State;
  /** State value type */
  value?: State[Key & keyof State];
};
declare module "pinia" {
  // eslint-disable-next-line no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    cache?: Cache<S>;
  }
}
