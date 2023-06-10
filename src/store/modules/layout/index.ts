import { once, debounce } from "lodash";
import { defineStore } from "pinia";
import { nextTick, watch } from "vue";
import { LayoutState } from "./layout.types";

export const useLayoutStore = defineStore("layout", {
  state: (): LayoutState => ({
    layout_asideWidth: 260,
    layout_shrinkMenuWidth: 210,
    layout_headerHeight: 55,
    layout_tabsHeight: 40,
    layout_footerHeight: 65,
    layout_minWidth: 1000,
    layout_isLargeWindow: false,
    layout_asideRef: null,
    layout_shrinkMenuRef: null,
    layout_drawerMenuRef: null,
    layout_isShrinkMenuExpand: false,
    layout_isDrawerMenuExpand: false
  }),
  actions: {
    /**
     * 1.初始化layout
     * 2.添加 WindowResize 事件
     */
    // eslint-disable-next-line no-unused-vars, func-names
    useWindowResize: once(function (this: LayoutState) {
      this.layout_isLargeWindow = window.matchMedia(`(min-width: ${this.layout_minWidth}px)`).matches;
      watch(
        () => this.layout_isLargeWindow,
        (newValue) => {
          nextTick(() => {
            const asideRef = this.layout_asideRef as HTMLElement;
            if (newValue) {
              const { layout_asideWidth } = this;
              asideRef.style.width = `${layout_asideWidth}px`;
              this.layout_isShrinkMenuExpand = false;
              this.layout_isDrawerMenuExpand = false;
            } else {
              asideRef.style.width = "0";
              this.layout_isDrawerMenuExpand = false;
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
          this.layout_isLargeWindow = window.matchMedia(`(min-width: ${this.layout_minWidth}px)`).matches;
        }, 50)
      );
    }),
    /**
     * 响应菜单展开关闭
     */
    useMenuExpand(isExpand?: boolean) {
      const asideRef = this.layout_asideRef as HTMLElement;
      const { layout_asideWidth, layout_isShrinkMenuExpand, layout_shrinkMenuWidth } = this;
      if (this.layout_isLargeWindow) {
        if (layout_isShrinkMenuExpand) {
          asideRef.style.width = `${layout_asideWidth}px`;
          this.layout_isShrinkMenuExpand = false;
        } else {
          asideRef.style.width = `${layout_asideWidth - layout_shrinkMenuWidth}px`;
          this.layout_isShrinkMenuExpand = true;
        }
      } else {
        this.layout_isDrawerMenuExpand = isExpand || !this.layout_isDrawerMenuExpand;
      }
    }
  }
});
export default useLayoutStore;
