import type { ComponentOptions } from "vue";
import type { Nullable } from "@/types";

export type RouteMenu = {
  redirect?: Nullable<string>;
  path?: Nullable<string>;
  name?: Nullable<string>;
  key?: Nullable<string>;
  show?: Nullable<boolean>;
  label?: Nullable<string>;
  component?: Nullable<() => Promise<{ [key: string]: any }>>;
  children?: RouteMenu[];
  meta: {
    id?: Nullable<string>;
    title?: Nullable<string>;
    isCache?: Nullable<boolean>;
    isHidden?: Nullable<boolean>;
    outside?: Nullable<boolean>;
    icon?: Nullable<string>;
    breadcrumb: unknown[];
  };
};

export interface FindDeepByIdOptions<T> {
  arr: T[];
  children_field?: keyof T;
  id_field: keyof T;
  value?: unknown;
}
export interface RouterState {
  /**
   * 全部动态路由
   */
  router_asyncRoutes: RouteMenu[];
  /**
   * 联动菜单的数据
   */
  router_shrinkMenuData: RouteMenu[];
  /**
   * 宽菜单内部naiveMenu
   */
  router_shrinkMenuRef: Nullable<ComponentOptions>;

  /**
   * 窄菜单索引
   */
  router_smallMenuKey: number;
  /**
   * shrinkWithDrawerMenuKey
   */
  router_shrinkWithDrawerMenuKey: string;
}
