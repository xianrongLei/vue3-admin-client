import { defineStore } from "pinia";
import { useMutation } from "@vue/apollo-composable";
import { UseStateOperatorInput } from "../../store.types";
import { getUserInfoGql } from "./user.gql";
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
    /**
     * state 操作器
     * @param param0
     */
    useUserStateOperator<Key>(key: keyof UserState, value: UserState[Key & keyof UserState]): void {
      (this as any)[key] = value;
    },
    async useGetUserInfo(userId?: string) {
      const { mutate } = useMutation(getUserInfoGql, () => ({
        variables: {
          userId
        }
      }));
      const [err, result] = await awaitTo(mutate());
      console.log(result);

      if (err) throw new Error(err.message);
      this.useUserStateOperator<"user_userInfo">("user_userInfo", {
        ...result?.data?.user
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
