import { defineStore } from "pinia";
import { UseStateOperatorInput } from "../types";

export interface UserState {
  user_token: {
    access_token?: string;
    refresh_token?: string;
  };
  user_userInfo: {
    id?: string;
    access_token?: string;
    refresh_token?: string;
  };
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user_userInfo: {},
    user_token: {}
  }),
  actions: {
    useUserStateOperator<V>({
      key,
      value
    }: UseStateOperatorInput<UserState, V>): void {
      (this as any)[key] = value;
    }
  },
  cache: {
    user_token: {
      type: "local",
      default: {}
    }
  }
});
export default useUserStore;
