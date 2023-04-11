import { defineStore } from "pinia";
import { UseStateOperatorInput } from "../index";

interface State {
  login_userInfo: Record<string, any>;
}

export const useLoginStore = defineStore("login", {
  state: (): State => ({
    login_userInfo: {}
  }),
  actions: {
    useStateOperator({
      stateKey,
      value
    }: UseStateOperatorInput<keyof State>): void {
      this.$state[stateKey] = value;
    }
  },
  cache: {
    login_userInfo: {
      type: "local",
      default: {}
    }
  }
});
export default useLoginStore;
