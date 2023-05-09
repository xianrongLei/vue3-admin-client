import { defineStore } from "pinia";
import { useMutation } from "@vue/apollo-composable";
import { UseStateOperatorInput } from "../../store.types";
import { getUserInfoGql } from "./gql";
import { awaitTo } from "@/utils/utils.awaitTo";

export interface UserState {
  user_token: {
    userId?: string;
    access_token?: string;
    refresh_token?: string;
  };
  user_userInfo: {
    id?: string;
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
      this.$state[key] = value as UserState[V & keyof UserState];
    },
    async useGetUserInfo(userId?: string) {
      const { mutate } = useMutation(getUserInfoGql, () => ({
        variables: {
          userId
        }
      }));
      const [err, data] = await awaitTo(mutate());
      if (err) throw new Error(err as any);
      this.useUserStateOperator<"user_userInfo">({
        key: "user_userInfo",
        value: {
          ...data.data.user
        }
      });
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
