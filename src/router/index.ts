import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";
import { mountGuard } from "./router.guard";

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    redirect: "/index",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/index",
        component: () => import("@/views/home/index.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/redirect/:pathMatch(.*)",
    component: () => import("@/layout/routerRedirect/Redirect.vue")
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/error/404.vue")
  }
];
// 路由器
export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});
mountGuard(router);
export const mountRouter = (vueUse: Function) => {
  vueUse(router);
};
