import { defineStore } from "pinia";
import { UseStateOperatorInput } from "../../store.types";

export interface LoginState {}

export const useLoginStore = defineStore("login", {
  state: (): LoginState => ({}),
  actions: {
    useStateOperator<Key>({
      key,
      value
    }: UseStateOperatorInput<LoginState, Key>): void {
      (this as any)[key] = value;
    }
  },
  cache: {}
});
export default useLoginStore;
