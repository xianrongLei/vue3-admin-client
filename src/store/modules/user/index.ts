import { defineStore } from "pinia";
import { useUserInfoApi, useUserMenuApi } from "./user.gql";
import { Menu } from "@/store/modules/router/router.types";

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
  user_menuTree: Omit<Menu, "children">[];
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
     * 将菜单列表转成树形结构
     * @param _children
     * @param parentId
     * @returns
     */
    useTransTree<T>(_children: T[] & any[], parentId: unknown): T[] {
      const result: T[] = [];
      for (let i = 0; i < _children.length; i += 1) {
        const child = _children[i];
        if (child.parentId === parentId) {
          const children = this.useTransTree(_children, child.id);
          if (children.length > 0) {
            child.children = children;
          }
          result.push(child);
        }
      }
      return result;
    },
    /**
     * 获取用户信息
     * @param userId
     */
    async useGetUserInfo(userId?: string, user?: UserState["user_userInfo"]) {
      const [userInfoApi, userMenuApi] = [
        useUserInfoApi({ userId }),
        useUserMenuApi({
          queryMenusByUserIdInput: {
            userId,
            orderBy: {
              field: "sort",
              direction: "desc"
            }
          }
        })
      ];
      if (user) {
        this.user_userInfo = user;
      } else {
        const data = (await userInfoApi.mutate()) as { data: { user: UserState["user_userInfo"] } };
        this.user_userInfo = data.data.user;
      }
      const menus = (await userMenuApi.mutate())?.data.menusByUserId;
      const menuTree = this.useTransTree<any>(menus, null);
      this.user_menuTree = menuTree;
    }
  }
});
export default useUserStore;
