import { defineStore } from "pinia";
import { RouteRecordRaw, Router } from "vue-router";
import { Menu } from "../user";

// 加载vue组件
const layoutModules = import.meta.glob("/src/views/**/*.vue");

export interface RouterState {
  router_asyncRoutes: RouteRecordRaw[];
  router_menuData: RouteRecordRaw[];
  router_activeKey: string;
}
// 把路径转换成驼峰命名
export const useRouterStore = defineStore("router", {
  state: (): RouterState => ({
    router_asyncRoutes: [],
    router_activeKey: "/index",
    router_menuData: []
  }),
  cache: {
    router_activeKey: {
      type: "local",
      default: "/index",
      beforeMounted(cache) {
        this.router_activeKey = cache as any;
      }
    }
  },
  actions: {
    /**
     * 挂载路由
     * @param router
     * @param menuTree
     */
    useMountRoutes(router: Router, menuTree: Menu[]) {
      const asyncRoutes = this.useGetBreadcrumb(this.useGenerateRoutes(menuTree));
      this.router_asyncRoutes = asyncRoutes;
      // 设置收缩菜单初始化数据
      this.router_menuData = asyncRoutes.filter((route: any) => route.key === this.router_activeKey);
      asyncRoutes.forEach((route) => {
        router.addRoute("/", route);
      });
    },
    /**
     * 获取组件
     * @param componentUrl
     * @returns
     */
    useGetComponent(componentUrl: string): any {
      const component = layoutModules[`/src/views/${componentUrl}.vue`];
      if (!component) {
        // eslint-disable-next-line no-console
        console.error("组件不存在，路径为：", componentUrl);
      }
      return component;
    },
    /**
     * 根据menuTree生成路由
     * @param menuTree
     * @returns
     */
    useGenerateRoutes(menuTree: Menu[]): RouteRecordRaw[] {
      const routers: RouteRecordRaw[] = [];
      menuTree.forEach((_menu: Menu) => {
        const menu = _menu as Required<Menu>;
        // eslint-disable-next-line one-var
        let component, path, redirect;
        const childrenExist = menu.children && menu.children.length > 0;
        // 有child  说明不是模块 否则说明是模块 则获取模块的组件
        if (childrenExist) {
          path = `/${menu.route}`;
          redirect = (menu.children as any)[0].route;
        } else {
          component = this.useGetComponent(menu.component);
          path = `/${menu.route}`;
          redirect = undefined;
        }
        const route: any = {
          path,
          name: menu.name.replace(/\/(\w)/g, (_all, letter) => letter.toUpperCase()),
          redirect,
          component,
          key: menu.id,
          label: menu.title,
          children: [],
          meta: {
            title: menu.title,
            icon: menu.icon,
            id: menu.id,
            cache: menu.isCache,
            breadcrumb: []
          }
        };
        route.meta.breadcrumb.push(menu.title);
        // 有子菜单的情况
        if (childrenExist) {
          route.children?.push(...this.useGenerateRoutes(menu.children));
        } else {
          route.children = undefined;
        }
        routers.push(route);
      });
      return routers;
    },
    /**
     * 设置面包屑数据
     * @param routes
     * @returns
     */
    useGetBreadcrumb(routes: any[]): RouteRecordRaw[] {
      const breadcrumb: string[] = [];
      const getBreadcrumb = (route: any) => {
        breadcrumb.push(route.meta.title);
        route.meta.breadcrumb = [...breadcrumb]; // 新数组;
        if (route.children) {
          route.children = route.children.map((child: any) => getBreadcrumb(child));
        }
        return route;
      };
      return routes.map((route) => {
        // 重置
        breadcrumb.length = 0;
        return getBreadcrumb(route);
      });
    }
  }
});
export default useRouterStore;
