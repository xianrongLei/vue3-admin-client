import { defineStore } from "pinia";
import { useUserInfoApi, useUserMenuApi } from "./user.gql";

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
      this[key] = value;
    },
    /**
     * 获取用户信息
     * @param userId
     */
    async useGetUserInfo(userId?: string) {
      const [userInfoApi, userMenuApi] = [useUserInfoApi({ userId }), useUserMenuApi({ userId })];
      const [userInfo, menus] = await Promise.all([userInfoApi.mutate(), userMenuApi.mutate()]);
      console.log(menus);
      this.useUserStateOperator<"user_userInfo">("user_userInfo", {
        ...userInfo?.data?.user
      });
    }
  }
});
export default useUserStore;
