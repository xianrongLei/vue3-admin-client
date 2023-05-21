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
      }
    ]
  }),
  actions: {}
});
export default useRouterStore;
