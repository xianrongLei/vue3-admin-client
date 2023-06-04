import { defineStore } from "pinia";
import { RouteRecordRaw, Router } from "vue-router";
import { Menu } from "../user";

// 加载vue组件
const layoutModules = import.meta.glob("/src/views/**/*.vue");
// 把路径转换成驼峰命名
export const useRouterStore = defineStore("router", {
  state: () => ({
    router_asyncRoutes: [
      {
        path: "/login2",
        name: "",
        meta: {},
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
  actions: {
    useMountRoutes(router: Router, menuTree: Menu[]) {
      const routes = this.useGenerateRoutes(menuTree);
      routes.forEach((route) => {
        router.addRoute("/", route);
      });
    },
    useGetComponent(componentUrl: string): any {
      const component = layoutModules[`/src/views/${componentUrl}.vue`];
      if (!component) {
        // eslint-disable-next-line no-console
        console.error("组件不存在，路径为：", componentUrl);
      }
      return component;
    },
    usePathToCamel(path: string): string {
      return path.replace(/\/(\w)/g, (_all, letter) => letter.toUpperCase());
    },
    useGenerateRoutes(menuTree: Menu[]): RouteRecordRaw[] {
      const routers: RouteRecordRaw[] = [];
      menuTree.forEach((_menu: Menu) => {
        const menu = _menu as Required<Menu>;
        // eslint-disable-next-line one-var
        let component, path, redirect;
        const childrenExist = menu.children && menu.children.length > 0;
        // 有child  说明不是模块 否则说明是模块 则获取模块的组件
        if (childrenExist) {
          // component = () => import("@/layout/index.vue");
          path = `/${menu.route}`;
          redirect = (menu.children as any)[0].route;
        } else {
          component = this.useGetComponent(menu.component);
          path = `/${menu.route}`;
          redirect = undefined;
        }
        const route: RouteRecordRaw = {
          path,
          name: this.usePathToCamel(path),
          redirect,
          component,
          children: [],
          meta: {
            title: menu.title,
            icon: menu.icon,
            id: menu.id,
            cache: menu.isCache,
            breadcrumb: []
          }
        };
        // 有子菜单的情况
        if (childrenExist) {
          route.children?.push(...this.useGenerateRoutes(menu.children));
        }
        routers.push(route);
      });
      return routers;
    }
  }
});
export default useRouterStore;
