import { defineStore } from "pinia";
import { useUserInfoApi, useUserMenuApi } from "@/gqlApi/user.gql";
import type { Menu, User } from "@/types/gql.types";
import { MenuOrderFelid, OrderDirection } from "@/types/gql.types";
import type { Nullable } from "@/types";

export interface UserState {
  user_token: {
    userId?: Nullable<string>;
    access_token?: Nullable<string>;
    refresh_token?: Nullable<string>;
  };
  user_userInfo: User;
  user_menuTree: Menu[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user_userInfo: {},
    user_token: {},
    user_menuTree: []
  }),
  cache: {
    user_token: {
      type: "local",
      default: {}
    }
  },
  actions: {
    /**
     * 获取用户信息
     * @param userId
     */
    async useGetUserInfo(userId: string, user?: User) {
      if (user) {
        this.user_userInfo = user;
      }
      if (!user) {
        const result = await useUserInfoApi({ userId }).mutate();
        if (!result?.data) throw new Error("获取用户信息失败");
        this.user_userInfo = result.data.user;
      }
      const result = await useUserMenuApi({
        queryMenusByUserIdInput: {
          userId,
          query: {
            parentId: null
          },
          orderBy: [
            {
              field: MenuOrderFelid.sort,
              direction: OrderDirection.asc
            },
            {
              field: MenuOrderFelid.createdAt,
              direction: OrderDirection.asc
            }
          ]
        }
      }).mutate();
      if (!result?.data) throw new Error("获取用户菜单失败");
      const menus = result.data.menusByUserId;
      this.user_menuTree = menus;
    }
  }
});
export default useUserStore;
