import { defineStore } from "pinia";
import { useUserInfoApi } from "./user.gql";
import { awaitTo } from "@/utils/utils.awaitTo";

export interface UserState {
  user_token: {
    userId?: string;
    access_token?: string;
    refresh_token?: string;
  };
  user_userInfo: {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    creator?: string;
    updater?: string;
    username?: string;
    password?: string;
    email?: string;
    nickname?: string;
    phone?: string;
    age?: string;
    sex?: string;
    admin?: string;
    avatar?: string;
    sort?: string;
    state?: string;
    roleId?: string;
    creatorName?: string;
    updaterName?: string;
  };
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user_userInfo: {},
    user_token: {}
  }),
  cache: {
    user_token: {
      type: "local",
      default: {}
    }
  },
  actions: {
    /**
     * state 操作器
     * @param param0
     */
    useUserStateOperator<Key>(key: keyof UserState, value: UserState[Key & keyof UserState]): void {
      (this as any)[key] = value;
    },
    /**
     * 获取用户信息
     * @param userId
     */
    async useGetUserInfo(userId?: string) {
      const userInfoApi = useUserInfoApi({
        userId
      });
      const [err, result] = await awaitTo(userInfoApi.mutate());
      if (err) throw new Error(err.message);
      this.useUserStateOperator<"user_userInfo">("user_userInfo", {
        ...result?.data?.user
      });
    }
  }
});
export default useUserStore;
