import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from "vue-router";
import { useLoginStore } from "@/store/modules/login";

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
    path: "/test",
    component: () => import("@/layout/index.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue")
  }
];
const errorRoute: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/error/404.vue")
  }
];
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

export default router;

const whiteList: string[] = ["/login"];
// eslint-disable-next-line arrow-body-style
const isEmpty = (value: any): boolean => {
  return (
    JSON.stringify(value) === "{}" || JSON.stringify(value) === "[]" || !value
  );
};

// 路由加载前
router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore();
  // 用户已登录
  const userInfoEmpty = isEmpty(loginStore.$state.login_userInfo);

  if (!userInfoEmpty) {
    // 已登录 路由地址为login则跳转到首页
    // console.log(to.path);
    if (to.path === "/login") {
      // 跳转到首页
      next("/home");
    } else {
      next();
    }
  }
  // 用户未登录 可以进入白名单
  else if (whiteList.indexOf(to.path) > -1) {
    next();
  }
  // 用户未登录 路由地址不在白名单白名单 跳转到login
  else {
    next("/login");
  }
});
