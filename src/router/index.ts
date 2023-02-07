import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router"
import store from "@/store"
import Layout from "@/layout/index.vue"

const getKeepAliveRoutes = (rs: RouteRecordRaw[], breadcrumb: RouteRecordRaw[]): RouteRecordRaw[] => {
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
  // token存在的情况
  if (store.user.token) {
    if (!store.user.id) {
      const menuRoutes: RouteRecordRaw[] = []

      // 根据后端菜单路由，生成KeepAlive路由
      const keepAliveRoutes = getKeepAliveRoutes(menuRoutes, [])

      // 添加菜单路由
      asyncRoutes.children?.push(...keepAliveRoutes)
      router.addRoute(asyncRoutes)

      // 错误路由
      errorRoute.forEach(item => {
        router.addRoute(item)
      })

      // 保存路由数据
      // store.routerStore.setRoutes(constantRoutes.concat(asyncRoutes))

      next({ ...to, replace: true })
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    next("/login")
  }
})
