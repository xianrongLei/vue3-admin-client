import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from "vue-router";
import { mountGuard } from "./guard";

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
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
    component: () => import("@/layout/Router/Redirect.vue")
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
