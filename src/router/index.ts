import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

import Layout from "@/layout/index.vue"

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  {
    name: "page1",
    path: "/page1",
    component: Layout,
    children: [
      {
        path: "/page1",
        component: () => import("@/views/test-page1/index.vue")
      },
      {
        path: "/page2",
        component: () => import("@/views/test-page2/index.vue")
      },
      {
        path: "/page3",
        component: () => import("@/views/test-page3/index.vue")
      }
    ]
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/notFound/index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
