import { defineStore } from "pinia";
import { UseStateOperatorInput } from "../types";

export interface LoginState {}

export const useLoginStore = defineStore("login", {
  state: (): LoginState => ({}),
  actions: {
    useStateOperator<V>({
      key,
      value
    }: UseStateOperatorInput<LoginState, V>): void {
      (this as any)[key] = value;
    }
  },
  cache: {}
});
export default useLoginStore;
