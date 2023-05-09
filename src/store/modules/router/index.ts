import { defineStore } from "pinia";

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
