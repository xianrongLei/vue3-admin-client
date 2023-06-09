import { defineStore } from "pinia";
import { Router } from "vue-router";
import { nextTick } from "vue";
import { AsyncRoute, Menu, RouterState } from "@/store/modules/router/router.types";

// 加载vue组件
const layoutModules = import.meta.glob("/src/views/**/*.vue");
// 把路径转换成驼峰命名
export const useRouterStore = defineStore("router", {
  state: (): RouterState => ({
    router_asyncRoutes: [],
    router_activeKey: "/index",
    router_menuData: [],
    router_menuInstRef: null,
    router_xActiveKey: "",
    router_xMenuData: []
  }),
  cache: {
    router_activeKey: {
      type: "local",
      default: "/index",
      beforeMounted(cache: any) {
        if (cache) this.router_activeKey = cache;
      }
    },
    router_xActiveKey: {
      type: "local",
      default: "",
      beforeMounted(cache: any) {
        if (cache) {
          this.router_xActiveKey = cache;
        }
        this.router_xActiveKey = this.layout_activeKey;
      }
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
            // 没有传value  说明是找结果为空的值 找到则返回
            if (!value && !item[id_filed]) {
              return result.push(item, $index);
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
     * 设置窄菜单数据
     */
    useSetXMenuData() {
      this.router_xMenuData = this.router_asyncRoutes.map((e, i) => {
        const [select] = this.useFindDeepById({
          arr: [e],
          children_filed: "children",
          id_filed: "children"
        });

        if (select.meta.outside) {
          if (e.children) {
            const selectSpare = (e as any).children.filter(
              (_e: any) => !_e.children && !_e.meta.outside && !_e.meta.isHidden
            )[0];
            if (selectSpare) {
              return {
                ...selectSpare,
                key: selectSpare.key,
                label: e.label,
                meta: e.meta
              };
            }
          }
        }
        return {
          ...select,
          key: select.key,
          label: e.label,
          meta: e.meta
        };
      });
    },
    /**
     * 设置宽菜单数据，和选中的菜单
     */
    async useInitMenuData() {
      const asyncRoutes = this.router_asyncRoutes;
      /**
       * 判断是否是首次加载 , 如果是首次加载则更具路由地址设置第一个符合地址的路由为激活
       * 1. 第一种情况 没有缓存首次记载 使用路由地址查找 并使用第一个找到的
       * 3. 第三种情况 有缓存的路由 根据缓存的路由筛选得到的第一个数据
       */
      if (this.router_activeKey.indexOf("/") !== -1) {
        /**
         * 为了方便设置默认路由地址，如果是首次加载，根据默认路由查找到对应的route
         */
        const [select, index] = this.useFindDeepById({
          arr: asyncRoutes,
          children_filed: "children",
          id_filed: "path",
          value: this.router_activeKey
        });
        /**
         * 初始化在菜单和联动菜单的key
         * 初始化联动菜单的routes
         */
        this.router_activeKey = select.key;
        this.router_xActiveKey = select.key;
        this.router_menuData = [asyncRoutes[index]];
      } else {
        /**
         * 更新窄菜单路由查找对应的联动菜单下标
         */
        const [, index] = this.useFindDeepById({
          arr: asyncRoutes,
          children_filed: "children",
          id_filed: "key",
          value: this.router_activeKey
        });
        /**
         * 大窗口模式设置同步联动菜单
         */
        this.router_menuData = [asyncRoutes[index]];
        /**
         * 抽屉菜单和窄菜单激活项同步
         */
        this.router_xActiveKey = this.router_activeKey;
        this.router_xMenuData[index].key = this.router_activeKey;
      }
      // 等待菜单渲染完毕 否子展开菜单失效
      await nextTick();
      this.router_menuInstRef?.showOption(this.router_activeKey);
    },
    /**
     * 1.路由初始化函数
     * 挂载路由，仅在路由守卫中当用户信息不存在重新初始化路由时调用
     * @param router
     * @param menuTree
     */
    useMountRoutes(router: Router, menuTree: Menu[]) {
      this.router_asyncRoutes = this.useGenerateRoutes(menuTree);
      this.useSetXMenuData();
      this.useInitMenuData();
      this.router_asyncRoutes.forEach((route) => {
        router.addRoute("/", route);
      });
    },
    /**
     * 2.路由初始化函数
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
     * 3.路由初始化函数
     * 根据menuTree生成路由
     * @param menuTree
     * @returns
     */
    useGenerateRoutes(menuTree: Menu[]): AsyncRoute[] {
      const routers: AsyncRoute[] = [];
      menuTree.forEach((_menu: Menu) => {
        const { children, ...menuInfo } = _menu as Required<Menu>;
        // eslint-disable-next-line one-var
        let component, path, redirect;
        const childrenExist = children && children.length > 0;
        // 有child  说明不是模块 否则说明是模块 则获取模块的组件
        if (childrenExist) {
          path = `/${menuInfo.route}`;
          redirect = `/${(children as any)[0].route}`;
        } else if (menuInfo.outside) {
          path = `/${menuInfo.route}`;
          redirect = undefined;
        } else {
          component = this.useGetComponent(menuInfo.component);
          path = `/${menuInfo.route}`;
          redirect = undefined;
        }
        const route: any = {
          path,
          name: menuInfo.name.replace(/\/(\w)/g, (_all, letter) => letter.toUpperCase()),
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
        if (childrenExist) {
          route.children?.push(...this.useGenerateRoutes(children));
        } else if (menuInfo.type === 0) {
          route.children = undefined;
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
