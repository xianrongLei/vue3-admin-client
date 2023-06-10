import { ComponentOptions } from "vue";
import { RouteRecordRaw } from "vue-router";

export type Menu = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  creator?: string;
  updater?: string;
  sort?: string;
  state?: string;
  name?: string;
  description?: string;
  route?: string;
  icon?: string;
  title?: string;
  type?: number;
  component?: string;
  outside?: string;
  parentId?: string;
  isCache?: boolean;
  isHidden?: boolean;
  children?: [];
};

export type AsyncRoute = {
  key: string;
  show: Boolean;
  label: string;
  meta: {
    outside: boolean;
    icon: string;
    component: string;
  };
} & RouteRecordRaw;

export interface FindDeepByIdOptions {
  arr: any[];
  children_field?: string;
  id_field: string;
  value?: any;
}
export interface RouterState {
  /**
   * 全部动态路由
   */
  router_asyncRoutes: AsyncRoute[];
  /**
   * 联动菜单的数据
   */
  router_shrinkMenuData: AsyncRoute[];
  /**
   * 宽菜单内部naiveMenu
   */
  router_shrinkMenuRef: null | ComponentOptions;

  /**
   * 窄菜单索引
   */
  router_smallMenuKey: number;
  /**
   * shrinkWithDrawerMenuKey
   */
  router_shrinkWithDrawerMenuKey: string;
}
