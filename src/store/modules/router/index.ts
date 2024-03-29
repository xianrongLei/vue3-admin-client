import { defineStore } from "pinia";
import type { RouteRecordRaw, Router } from "vue-router";
import { nextTick } from "vue";
import type { RouteMenu, FindDeepByIdOptions, RouterState } from "@/store/modules/router/router.types";
import type { Menu } from "@/types/gql.types";
import type { Nullable } from "@/types";
// 加载vue组件
const layoutModules = import.meta.glob("/src/views/**/*.vue");
export const useRouterStore = defineStore("router", {
  state: (): RouterState => ({
    router_asyncRoutes: [],
    router_shrinkMenuData: [],
    router_smallMenuKey: 0,
    router_shrinkWithDrawerMenuKey: "/index",
    router_shrinkMenuRef: null
  }),
  cache: {
    router_shrinkWithDrawerMenuKey: {
      type: "session",
      default: "/index",
      beforeMounted(cache) {
        if (cache) this.router_shrinkWithDrawerMenuKey = cache as string;
      }
    },
    router_smallMenuKey: {
      type: "session",
      default: 0,
      beforeMounted(cache) {
        if (cache) this.router_smallMenuKey = cache as number;
      }
    }
  },
  actions: {
    /**
     * 根据路由查找第一个符合条件的子菜单 未找到返回null
     * @param arr
     * @returns
     */
    useFindRouteByKey(options: FindDeepByIdOptions<RouteMenu>, result: RouteMenu[]): RouteMenu {
      const { arr, children_field = "children", id_field, value } = options;
      for (let i = 0; i < arr.length; i += 1) {
        const item = arr[i];
        // 不存在children
        if (!Array.isArray(item[children_field]) || item[children_field].length === 0) {
          /**
           * 1.没有传value  说明是找结果为空的值
           * 2.有value则找到等于value的返回
           */

          if (value && `${item[id_field]}` && item[id_field] === value) {
            result.push(item);
            return result[0];
          }
        } else {
          this.useFindRouteByKey({ arr: item[children_field], children_field, id_field, value }, result);
        }
      }
      return result[0];
    },
    /**
     * 设置宽菜单数据，和选中的菜单
     */
    async useSetShrinkMenuData() {
      const asyncRoutes = this.router_asyncRoutes;
      /**
       * 判断是否是首次加载 , 如果是首次加载则更具路由地址设置第一个符合地址的路由为激活
       * 1. 第一种情况 没有缓存首次记载 使用路由地址查找 并使用第一个找到的
       * 3. 第三种情况 有缓存的路由 根据缓存的路由筛选得到的第一个数据
       */

      if (this.router_shrinkWithDrawerMenuKey.indexOf("/") !== -1) {
        /**
         * 为了方便设置默认路由地址，如果是首次加载，根据默认路由查找到对应的route
         */
        const [select, index] = this.router_asyncRoutes
          .map((e, i) => {
            const result = this.useFindRouteByKey(
              {
                arr: [e],
                id_field: "path",
                value: "/index"
              },
              []
            );
            return [result, i];
          })
          .filter((e) => e[0])[0] as [RouteMenu, number];
        if (!select) throw new Error("'useSetShrinkMenuData', Not found a 'select' by ID !");
        /**
         * 初始化在菜单和联动菜单的key
         * 初始化联动菜单的routes
         */
        this.router_shrinkWithDrawerMenuKey = select?.key!;
        this.router_smallMenuKey = index!;
        this.router_shrinkMenuData = [asyncRoutes[this.router_smallMenuKey]];
      } else {
        /**
         * 大窗口模式设置同步联动菜单
         */
        this.router_shrinkMenuData = [asyncRoutes[this.router_smallMenuKey]];
      }
      // 等待菜单渲染完毕 否子展开菜单失效
      await nextTick();
      this.router_shrinkMenuRef?.showOption(this.router_shrinkWithDrawerMenuKey);
    },

    /**
     * 1.路由初始化函数
     * 挂载路由，仅在路由守卫中当用户信息不存在重新初始化路由时调用
     * @param router
     * @param menuTree
     */
    useMountRoutes(router: Router, menuTree: Nullable<Menu>[]) {
      this.router_asyncRoutes = this.useGenerateRoutes(menuTree);
      this.useSetShrinkMenuData();
      this.router_asyncRoutes.forEach((route) => {
        router.addRoute("/", route as RouteRecordRaw);
      });
    },
    /**
     * 2.路由初始化函数
     * 获取组件
     * @param componentUrl
     * @returns
     */
    useGetComponent(componentUrl: Nullable<string>) {
      const component = layoutModules[`/src/views/${componentUrl}.vue`];
      if (!component) {
        // eslint-disable-next-line no-console
        console.error("组件不存在，路径为：", componentUrl);
      }
      return component;
    },
    /**
     * 3.路由初始化函数
     * 根据menuTree生成路由
     * @param menuTree
     * @returns
     */
    useGenerateRoutes(menuTree: Nullable<Menu>[]): RouteMenu[] {
      const routers: RouteMenu[] = [];
      menuTree.forEach((_menu) => {
        // @ts-ignore
        const { children, ...menuInfo } = _menu;
        // eslint-disable-next-line one-var
        let component, path, redirect;
        // 有child  说明不是模块 否则说明是模块 则获取模块的组件
        if (children && children.length > 0) {
          path = `/${menuInfo.route}`;
          redirect = `/${children[0].route}`;
        } else if (menuInfo.outside) {
          path = `/${menuInfo.route}`;
          redirect = undefined;
        } else {
          component = this.useGetComponent(menuInfo.component || null);
          path = `/${menuInfo.route}`;
          redirect = undefined;
        }
        const route: RouteMenu = {
          path,
          name: menuInfo.name?.replace(/\/(\w)/g, (_all, letter) => letter.toUpperCase()),
          key: menuInfo.id,
          label: menuInfo.title,
          show: !menuInfo.isHidden,
          redirect,
          component,
          children: [],
          meta: {
            ...menuInfo,
            id: menuInfo.id,
            title: menuInfo.title,
            icon: menuInfo.icon,
            outside: menuInfo.outside,
            isCache: menuInfo.isCache,
            isHidden: menuInfo.isHidden,
            breadcrumb: [menuInfo.title]
          }
        };

        // 有子菜单的情况
        if (children?.length > 0) {
          route.children?.push(...this.useGenerateRoutes(children));
        } else if (typeof menuInfo.type === "number" && menuInfo.type === 0) {
          route.children = undefined;
        } else if (typeof menuInfo.type === "number" && menuInfo.type > 1) {
          route.children = undefined;
          route.show = false;
        }
        routers.push(route);
      });
      return this.useSetBreadcrumb(routers);
    },
    /**
     * 4.路由初始化函数
     * 设置面包屑数据
     * @param routes
     * @returns
     */
    useSetBreadcrumb(routes: RouteMenu[]): RouteMenu[] {
      const breadcrumb: Nullable<string | undefined>[] = [];
      let deep = 0;
      const setBreadcrumb = (route: RouteMenu) => {
        breadcrumb.push(route.meta.title);
        route.meta.breadcrumb = [...breadcrumb.filter((e) => e)]; // 新数组;
        if (route.children) {
          deep += 1;
          route.children = route.children.map((child) => {
            breadcrumb.length = deep;
            return setBreadcrumb(child);
          });
        }
        return route;
      };

      return routes.map((route) => {
        // 重置
        breadcrumb.length = 0;
        return setBreadcrumb(route);
      });
    }
  }
});
export default useRouterStore;
