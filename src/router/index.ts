import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from "vue-router";
import { createDiscreteApi } from "naive-ui";
import { useUserStore } from "@/store/modules/user";

const getKeepAliveRoutes = (
  rs: RouteRecordRaw[],
  breadcrumb: RouteRecordRaw[]
): RouteRecordRaw[] => {
  const routerList: RouteRecordRaw[] = [];

  rs.forEach((item: any) => {
    if (item.meta.title) {
      breadcrumb.push(item.meta.title);
    }

    if (item.children && item.children.length > 0) {
      routerList.push(...getKeepAliveRoutes(item.children, breadcrumb));
    } else {
      item.meta.breadcrumb.push(...breadcrumb);
      routerList.push(item);
    }
    breadcrumb.pop();
  });
  return routerList;
};

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue")
  }
];
const errorRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)",
  component: () => import("@/views/error/404.vue")
};
const asyncRoutes: RouteRecordRaw = {
  path: "/home",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "/home",
      name: "home",
      meta: {
        title: "sdf",
        breadcrumb: []
      },
      component: () => import("@/views/home/index.vue")
    }
  ]
};

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});
const { loadingBar } = createDiscreteApi(["loadingBar"]);
const whiteList: string[] = ["/login"];

// 路由加载前
router.beforeEach(async (to, from, next) => {
  loadingBar.start();
  const { user_token, user_userInfo } = useUserStore();
  // 用户已登录
  if (user_token.access_token) {
    // 已登录 路由地址为login则跳转到首页
    // console.log(to.path);
    if (to.path === "/login") {
      // 跳转到首页
      next("/home");
    } else if (!user_userInfo.id) {
      // 用户信息不存在
      // 错误路由
      router.addRoute(errorRoute);

      next({ ...to, replace: true });
    } else {
      // 用户信息存在
      next();
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    // 用户未登录 可以进入白名单
    next();
  } else {
    // 用户未登录 路由地址不在白名单白名单 跳转到login
    next("/login");
  }
});
router.afterEach(() => {
  loadingBar.finish();
});
export default router;
