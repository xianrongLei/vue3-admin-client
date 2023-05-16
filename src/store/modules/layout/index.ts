import { once, debounce } from "lodash";
import { defineStore } from "pinia";
import { ComponentOptions, nextTick } from "vue";

export type LayoutState = {
  /**
   *  aside的宽度 单位px
   */
  readonly layout_asideWidth: number;
  /**
   *  收缩菜单的宽度 单位px
   */
  readonly layout_menuWidth: number;
  /**
   *  header的高度 单位px
   */
  readonly layout_headerHeight: number;
  /**
   *  tabs的高度 单位px
   */
  readonly layout_tabsHeight: number;
  /**
   * 多小算小窗口
   */
  readonly layout_minWidth: number;
  /**
   * 是否是小窗口
   */
  layout_isLargeWindow: boolean;
  /**
   * 菜单是否展开
   */
  layout_isMenuExpand: boolean;
  /**
   * 侧边栏组件
   */
  layout_asideRef: null | ComponentOptions;
  /**
   * 收缩菜单组件
   */
  layout_menuRef: null | ComponentOptions;
  /**
   * 窄菜单组件
   */
  layout_xMenuRef: null | ComponentOptions;
};

export const useLayoutStore = defineStore("layout", {
  state: (): LayoutState => ({
    layout_asideWidth: 260,
    layout_menuWidth: 210,
    layout_headerHeight: 60,
    layout_tabsHeight: 40,
    layout_minWidth: 1000,
    layout_isLargeWindow: false,
    layout_isMenuExpand: false,
    layout_asideRef: null,
    layout_menuRef: null,
    layout_xMenuRef: null
  }),
  actions: {
    /**
     * state 操作器
     * @param param0
     */
    useLayoutStateOperator<Key>(key: keyof LayoutState, value: LayoutState[Key & keyof LayoutState]): void {
      (this as any)[key] = value;
    },
    /**
     * 初始化layout 只会调用一次
     */
    // eslint-disable-next-line no-unused-vars, func-names
    useInitLayout: once(function (this: LayoutState) {
      const { layout_minWidth, layout_asideWidth } = this;
      window.addEventListener(
        "resize",
        debounce(() => {
          const mediaQuery = window.matchMedia(`(min-width: ${layout_minWidth}px)`);
          const layout_asideRef = this.layout_asideRef as HTMLElement & ComponentOptions;
          this.layout_isLargeWindow = mediaQuery.matches;
          if (this.layout_isLargeWindow) {
            layout_asideRef.style.width = `${layout_asideWidth}px`;
          } else {
            layout_asideRef.style.width = `0px`;
          }
        }, 50)
      );
      // 解决绑定事件时不会触发resize事件的问题
      this.layout_isLargeWindow = window.matchMedia(`(min-width: ${layout_minWidth}px)`).matches;
      nextTick(() => {
        const layout_asideRef = this.layout_asideRef as HTMLElement & ComponentOptions;
        if (this.layout_isLargeWindow) {
          layout_asideRef.style.width = `${layout_asideWidth}px`;
        } else {
          layout_asideRef.style.width = `0px`;
        }
      });
    }),
    /**
     * 响应菜单展开关闭
     */
    useMenuExpand() {
      this.layout_isMenuExpand = !this.layout_isMenuExpand;
      const layout_asideRef = this.layout_asideRef as HTMLElement & ComponentOptions;
      const layout_menuRef = this.layout_menuRef as HTMLElement & ComponentOptions;
      const { layout_asideWidth, layout_menuWidth } = this;
      // 收菜单
      if (this.layout_isMenuExpand) {
        // 大窗口
        if (this.layout_isLargeWindow) {
          layout_asideRef.style.width = `${layout_asideWidth - layout_menuWidth}px`;
          layout_menuRef.style.width = `0px`;
        } else {
          layout_asideRef.style.width = `0px`;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.layout_isLargeWindow) {
          layout_asideRef.style.width = `${this.layout_asideWidth}px`;
        } else {
          layout_asideRef.style.width = `${layout_asideWidth - layout_menuWidth}px`;
        }
      }
    }
  }
});
export default useLayoutStore;
