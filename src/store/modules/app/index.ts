import { once, debounce } from "lodash";
import { defineStore } from "pinia";
import { nextTick, watch } from "vue";
import type { AppState } from "./app.types";
import type { RouteMenu } from "../router/router.types";

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    app_asideWidth: 260,
    app_shrinkMenuWidth: 210,
    app_headerHeight: 55,
    app_tabsHeight: 31,
    app_footerHeight: 65,
    app_minWidth: 1000,
    app_isLargeWindow: false,
    app_asideRef: null,
    app_shrinkMenuRef: null,
    app_drawerMenuRef: null,
    app_isShrinkMenuExpand: false,
    app_isDrawerMenuExpand: false,
    app_tabList: [],
    app_activeTab: {}
  }),
  actions: {
    /**
     * 1.初始化App
     * 2.添加 WindowResize 事件
     */
    // eslint-disable-next-line no-unused-vars, func-names
    useWindowResize: once(function (this: AppState) {
      this.app_isLargeWindow = window.matchMedia(`(min-width: ${this.app_minWidth}px)`).matches;
      watch(
        () => this.app_isLargeWindow,
        (newValue) => {
          nextTick(() => {
            const asideRef = this.app_asideRef as HTMLElement;
            if (newValue) {
              const { app_asideWidth } = this;
              asideRef.style.width = `${app_asideWidth}px`;
              this.app_isShrinkMenuExpand = false;
              this.app_isDrawerMenuExpand = false;
            } else {
              asideRef.style.width = "0";
              this.app_isDrawerMenuExpand = false;
            }
          });
        },
        {
          immediate: true
        }
      );
      window.addEventListener(
        "resize",
        debounce(() => {
          this.app_isLargeWindow = window.matchMedia(`(min-width: ${this.app_minWidth}px)`).matches;
        }, 50)
      );
    }),
    /**
     * 响应菜单展开关闭
     */
    useMenuExpand(isExpand?: boolean) {
      const asideRef = this.app_asideRef as HTMLElement;
      const { app_asideWidth, app_isShrinkMenuExpand, app_shrinkMenuWidth } = this;
      if (this.app_isLargeWindow) {
        if (typeof isExpand === "boolean") {
          this.app_isShrinkMenuExpand = isExpand;
          asideRef.style.width = `${app_asideWidth}px`;
        } else if (app_isShrinkMenuExpand) {
          asideRef.style.width = `${app_asideWidth}px`;
          this.app_isShrinkMenuExpand = false;
        } else {
          asideRef.style.width = `${app_asideWidth - app_shrinkMenuWidth}px`;
          this.app_isShrinkMenuExpand = true;
        }
      } else {
        this.app_isDrawerMenuExpand = !this.app_isDrawerMenuExpand;
      }
    },
    /**
     * 往tabList增加一项
     * @param tab
     */
    useAddTabToList(tab: RouteMenu) {
      if (this.app_tabList.find((e) => e.key === tab.key)) {
        this.app_activeTab = tab;
        return;
      }
      this.app_tabList.push(tab);
    }
  }
});
export default useAppStore;
