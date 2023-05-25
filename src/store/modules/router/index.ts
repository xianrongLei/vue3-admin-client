import { defineStore } from "pinia";
/*
  id: ID
  createdAt: DateTime
  updatedAt: DateTime
  creator: ID
  updater: ID
  name: String
  route: String
  description: String
  icon: String
  title: String
  sort: Int
  state: Int
  type: Int
  outside: Boolean
  authNames: [String]
  parentId: ID
*/

export const useRouterStore = defineStore("router", {
  state: () => ({
    router_asyncRoutes: [
      {
        path: "/login2",
        component: () => import("@/views/login/index.vue")
      },
      {
        path: "/user",
        component: () => import("@/views/user/index.vue")
      },
      {
        path: "/department",
        component: () => import("@/views/organ/index.vue")
      },
      {
        path: "/dictEntry",
        component: () => import("@/views/post/index.vue")
      },
      {
        path: "/dictionary",
        component: () => import("@/views/role/index.vue")
      },
      {
        path: "/menu",
        component: () => import("@/views/department/index.vue")
      },
      {
        path: "/organ",
        component: () => import("@/views/dictEntry/index.vue")
      },
      {
        path: "/post",
        component: () => import("@/views/dictionary/index.vue")
      },
      {
        path: "/role",
        component: () => import("@/views/menu/index.vue")
      }
    ]
  }),
  actions: {}
});
export default useRouterStore;
