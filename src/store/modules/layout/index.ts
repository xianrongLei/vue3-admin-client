import { once, debounce } from "lodash";
import { defineStore } from "pinia";
import { nextTick } from "vue";

export type LayoutState = {
  /**
   *  aside的宽度 单位px
   */
  readonly layout_asideWidth: number;
  /**
   *  宽菜单的宽度 单位px
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
   *  底部信息栏的高度 单位px
   */
  readonly layout_footerHeight: number;
  /**
   * 窗口多大时隐藏侧边栏
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
   * 侧边栏
   */
  layout_asideRef: null | HTMLElement;
  /**
   * 宽菜单
   */
  layout_menuRef: null | HTMLElement;
  /**
   * 窄菜单
   */
  layout_xMenuRef: null | HTMLElement;
  /**
   * 遮罩
   */
  layout_maskRef: null | HTMLElement;
};

export const useLayoutStore = defineStore("layout", {
  state: (): LayoutState => ({
    layout_asideWidth: 260,
    layout_menuWidth: 210,
    layout_headerHeight: 55,
    layout_tabsHeight: 40,
    layout_footerHeight: 65,
    layout_minWidth: 1000,
    layout_isLargeWindow: false,
    layout_isMenuExpand: false,
    layout_asideRef: null,
    layout_menuRef: null,
    layout_xMenuRef: null,
    layout_maskRef: null
  }),
  actions: {
    /**
     * State Operator
     * @param param0
     */
    useLayoutStateOperator<Key>(key: keyof LayoutState, value: LayoutState[Key & keyof LayoutState]): void {
      (this as any)[key] = value;
    },
    /**
     * 添加 WindowResize 事件 只会调用一次
     * 防止无限增加 WindowResize 事件，选择单独抽离封装
     */
    // eslint-disable-next-line no-unused-vars, func-names
    useWindowResize: once(function (this: LayoutState & { useInitLayout: () => void }) {
      window.addEventListener(
        "resize",
        debounce(() => {
          this.layout_isLargeWindow = window.matchMedia(`(min-width: ${this.layout_minWidth}px)`).matches;
          this.useInitLayout();
        }, 50)
      );
    }),
    /**
     * 初始化layout
     */
    useInitLayout() {
      this.useWindowResize();
      const { layout_asideWidth, layout_menuWidth } = this;
      const mediaQuery = window.matchMedia(`(min-width: ${this.layout_minWidth}px)`);
      this.layout_isLargeWindow = mediaQuery.matches;
      // 重置菜单收缩状态
      this.layout_isMenuExpand = false;
      nextTick(() => {
        const asideRef = this.layout_asideRef as HTMLElement;
        const menuRef = this.layout_menuRef as HTMLElement;
        const xMenuRef = this.layout_xMenuRef as HTMLElement;
        const maskRef = this.layout_maskRef as HTMLElement;
        // 初始化遮罩
        maskRef.style.display = "none";
        // 大窗口
        if (this.layout_isLargeWindow) {
          // 初始化侧边栏宽度
          asideRef.style.width = `${layout_asideWidth}px`;
          // 初始化宽菜单宽度
          menuRef.style.width = `${layout_menuWidth}px`;
          // 初始化窄菜单宽度
          xMenuRef.style.width = `${layout_asideWidth - layout_menuWidth}px`;
          // 初始化菜单定位类型
          asideRef.style.position = "relative";
        } else {
          asideRef.style.width = `0px`;
        }
      });
    },
    /**
     * 响应菜单展开关闭
     */
    // eslint-disable-next-line no-unused-vars, func-names
    useMenuExpand() {
      // 取反对应收缩开关
      this.layout_isMenuExpand = !this.layout_isMenuExpand;
      const asideRef = this.layout_asideRef as HTMLElement;
      const menuRef = this.layout_menuRef as HTMLElement;
      const maskRef = this.layout_maskRef as HTMLElement;
      const xMenuRef = this.layout_xMenuRef as HTMLElement;
      const { layout_asideWidth, layout_menuWidth, layout_isLargeWindow, layout_isMenuExpand } = this;
      // layout_isMenuExpand 为真表示菜单折起 假则为收起
      if (layout_isMenuExpand) {
        // layout_isLargeWindow 为真表示当前是大窗口 假则为小窗口
        if (layout_isLargeWindow) {
          asideRef.style.position = "relative";
          asideRef.style.width = `${layout_asideWidth - layout_menuWidth}px`;
        } else {
          xMenuRef.style.width = `${layout_asideWidth}px`;
          menuRef.style.width = "0px";
          maskRef.style.display = "block";
          asideRef.style.width = `${layout_asideWidth}px`;
          asideRef.style.position = "absolute";
        }
      } else {
        // layout_isLargeWindow 为真表示当前是大窗口 假则为小窗口
        // eslint-disable-next-line no-lonely-if
        if (layout_isLargeWindow) {
          asideRef.style.position = "relative";
          xMenuRef.style.width = `${layout_asideWidth - layout_menuWidth}px`;
          asideRef.style.width = `${layout_asideWidth}px`;
        } else {
          asideRef.style.position = "absolute";
          maskRef.style.display = "none";
          asideRef.style.width = `0px`;
        }
      }
    }
  }
});
export default useLayoutStore;
