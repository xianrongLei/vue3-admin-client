import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw
} from "vue-router"
import store from "@/store"
import { isEmptyObj } from "@/utils/helpers"

const getKeepAliveRoutes = (
  rs: RouteRecordRaw[],
  breadcrumb: RouteRecordRaw[]
): RouteRecordRaw[] => {
  const routerList: RouteRecordRaw[] = []

  rs.forEach((item: any) => {
    if (item.meta.title) {
      breadcrumb.push(item.meta.title)
    }

    if (item.children && item.children.length > 0) {
      routerList.push(...getKeepAliveRoutes(item.children, breadcrumb))
    } else {
      item.meta.breadcrumb.push(...breadcrumb)
      routerList.push(item)
    }
    breadcrumb.pop()
  })
  return routerList
}

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
]
const errorRoute: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/error/404.vue")
  }
]
const asyncRoutes: RouteRecordRaw = {
  path: "/",
  component: () => import("@/layout/index.vue"),
  redirect: "/home",
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
}

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router

const whiteList: string[] = ["/login"]
// 路由加载前
router.beforeEach(async (to, from, next) => {
  if (!isEmptyObj(store.user.userInfo)) {
    // 获取个人信息
    if (!store.state.shared.isInit) {
      console.log("router")
    }
    if (to.path === "/login") {
      // 跳转到首页
      next("/home")
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    next("/login")
  }
})
