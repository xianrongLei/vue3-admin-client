import { defineStore } from "pinia";
import { Router } from "vue-router";
import { nextTick } from "vue";
import { AsyncRoute, Menu, RouterState } from "@/store/modules/router/router.types";
import useLayoutStore from "../layout";

// 加载vue组件
const layoutModules = import.meta.glob("/src/views/**/*.vue");
// 把路径转换成驼峰命名
export const useRouterStore = defineStore("router", {
  state: (): RouterState => ({
    router_asyncRoutes: [],
    router_activeKey: "/index",
    router_menuData: [],
    layout_menuInstRef: null
  }),
  cache: {
    router_activeKey: {
      type: "local",
      default: "/index",
      beforeMounted(cache: any) {
        if (cache) this.router_activeKey = cache;
      }
    }
  },
  getters: {
    /**
     * 窄菜单数据
     */
    useXMenuDate(): any[] {
      const layoutStore = useLayoutStore();
      if (layoutStore.layout_isLargeWindow) {
        return this.router_asyncRoutes.map((e) => {
          const [select] = (this as any).useFindDeepById({
            arr: [e],
            children_filed: "children",
            id_filed: "children"
          });
          return {
            ...select,
            label: e.label
          };
        });
      }
      return this.router_asyncRoutes;
    }
  },
  actions: {
    /**
     * 根据路由查找第一个符合条件的子菜单 未找到返回null
     * @param arr
     * @returns
     */
    useFindDeepById(options: { arr: any[]; children_filed: string; id_filed: string; value?: string }): any {
      // 结果
      const result: any = [];
      // 最外层索引
      let $index = -1;
      function F({ arr, children_filed, id_filed, value }: any): any {
        $index += 1; // 必须在函数调用后立即自增 放在最后循环中的递归会打乱顺序
        for (let i = 0; i < arr.length; i += 1) {
          const item = arr[i];
          // 不存在children
          if (!item[children_filed] || arr[i][children_filed]?.length === 0) {
            if (!value) {
              return !item[id_filed] && result.push(item, $index);
            }
            if (item[id_filed] === value) {
              return result.push(item, $index);
            }
          } else {
            F({ arr: item[children_filed], children_filed, id_filed, value });
          }
        }
      }
      F(options);
      return result;
    },
    /**
     * 设置宽菜单数据，和选中的菜单
     */
    async useInitMenuData($index?: number) {
      const asyncRoutes = this.router_asyncRoutes;
      /**
       * 判断是否是首次加载 , 如果是首次加载则更具路由地址设置第一个符合地址的路由为激活
       * 1. 第一种情况 没有缓存首次记载 使用路由地址查找 并使用第一个找到的
       * 2. 第二种情况 窄菜单触发的事件 直接有index 直接设置宽菜单数据
       * 3. 第三种情况 有缓存的路由 根据缓存的路由筛选得到的第一个数据
       */
      if (this.router_activeKey.indexOf("/") !== -1) {
        const [select, index] = this.useFindDeepById({
          arr: asyncRoutes,
          children_filed: "children",
          id_filed: "path",
          value: this.router_activeKey
        });
        this.router_activeKey = select.key;
        this.router_menuData = [asyncRoutes[index]];
      } else if ($index) {
        this.router_menuData = [asyncRoutes[$index]];
      } else {
        const [, index] = this.useFindDeepById({
          arr: asyncRoutes,
          children_filed: "children",
          id_filed: "key",
          value: this.router_activeKey
        });
        this.router_menuData = [asyncRoutes[index]];
      }
      // 等待菜单渲染完毕 否子展开菜单失效
      await nextTick();
      this.layout_menuInstRef?.showOption(this.router_activeKey);
    },
    /**
     * 挂载路由
     * @param router
     * @param menuTree
     */
    useMountRoutes(router: Router, menuTree: Menu[]) {
      this.router_asyncRoutes = this.useGenerateRoutes(menuTree);
      this.useInitMenuData();
      this.router_asyncRoutes.forEach((route) => {
        router.addRoute("/", route);
      });
    },
    /**
     * 根据menuTree生成路由
     * @param menuTree
     * @returns
     */
    useGenerateRoutes(menuTree: Menu[]): AsyncRoute[] {
      const routers: AsyncRoute[] = [];
      menuTree.forEach((_menu: Menu) => {
        const menu = _menu as Required<Menu>;
        // eslint-disable-next-line one-var
        let component, path, redirect;
        const childrenExist = menu.children && menu.children.length > 0;
        // 有child  说明不是模块 否则说明是模块 则获取模块的组件
        if (childrenExist) {
          path = `/${menu.route}`;
          redirect = `/${(menu.children as any)[0].route}`;
        } else {
          component = this.useGetComponent(menu.component);
          path = `/${menu.route}`;
          redirect = undefined;
        }
        const route: any = {
          path,
          name: menu.name.replace(/\/(\w)/g, (_all, letter) => letter.toUpperCase()),
          key: menu.id,
          label: menu.title,
          redirect,
          component,
          children: [],
          meta: {
            ...menu,
            title: menu.title,
            icon: menu.icon,
            id: menu.id,
            outside: menu.outside,
            isCache: menu.isCache,
            isHidden: menu.isHidden,
            breadcrumb: []
          }
        };
        route.meta.breadcrumb.push(menu.title);
        // 有子菜单的情况
        if (childrenExist) {
          route.children?.push(...this.useGenerateRoutes(menu.children));
        } else if (menu.type === 0) {
          route.children = undefined;
        }
        routers.push(route);
      });
      return this.useSetBreadcrumb(routers);
    },
    /**
     * 获取组件
     * @param componentUrl
     * @returns
     */
    useGetComponent(componentUrl: string): () => Promise<{ [key: string]: any }> {
      const component = layoutModules[`/src/views/${componentUrl}.vue`];
      if (!component) {
        // eslint-disable-next-line no-console
        console.error("组件不存在，路径为：", componentUrl);
      }
      return component;
    },
    /**
     * 设置面包屑数据
     * @param routes
     * @returns
     */
    useSetBreadcrumb(routes: AsyncRoute[]): AsyncRoute[] {
      const breadcrumb: string[] = [];
      const setBreadcrumb = (route: any) => {
        breadcrumb.push(route.meta.title as never);
        route.meta.breadcrumb = [...breadcrumb]; // 新数组;
        if (route.children) {
          route.children = route.children.map((child: any) => setBreadcrumb(child));
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
