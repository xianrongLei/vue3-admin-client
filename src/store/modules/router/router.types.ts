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
  label: string;
} & RouteRecordRaw;

export interface RouterState {
  /**
   * 全部动态路由
   */
  router_asyncRoutes: AsyncRoute[];
  /**
   * 激活联动菜单的数据
   */
  router_menuData: AsyncRoute[];
  /**
   * 激活路由key
   */
  router_activeKey: string;
  /**
   * 宽菜单内部naiveMenu
   */
  layout_menuInstRef: null | ComponentOptions;
}