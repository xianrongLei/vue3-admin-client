import { once } from "lodash";
import { defineStore } from "pinia";

export interface layoutState {
  /**
   *  aside 状态
   *  0 窄菜单 + 可折叠菜单折叠状态
   *  1 窄菜单 + 可折叠菜单展开状态
   *  2 窄菜单变成可折叠状态 + 保存隐藏状态
   *  4 窄菜单变成可折叠状态 + 保存展开状态
   */
  layout_asideState?: 0 | 1 | 2 | 3;
  /**
   *  aside的宽度 单位px
   */
  readonly layout_asideWidth?: number;
  /**
   *  收缩菜单的宽度 单位px
   */
  readonly layout_menuWidth?: number;
  /**
   *  header的高度 单位px
   */
  readonly layout_headerHeight?: number;
  /**
   *  tabs的高度 单位px
   */
  readonly layout_tabsHeight?: number;
}

export const useLayoutStore = defineStore("layout", {
  state: (): layoutState => ({
    layout_asideState: 0,
    layout_asideWidth: 260,
    layout_menuWidth: 210,
    layout_headerHeight: 60,
    layout_tabsHeight: 40
  }),
  getters: {
    layout_narrowMenuWidth(): number {
      if (typeof this.layout_asideWidth !== "number" || typeof this.layout_menuWidth !== "number") {
        throw new Error("layout_asideWidth and layout_menuWidth must be a number");
      }
      return this.layout_asideWidth - this.layout_menuWidth;
    }
  },
  actions: {
    /**
     * state 操作器
     * @param param0
     */
    useLayoutStateOperator<Key>(key: keyof layoutState, value: layoutState[Key & keyof layoutState]): void {
      (this as any)[key] = value;
    },
    /**
     * 初始化layout
     */
    useInitLayout: once(() => {
      window.addEventListener("resize", () => {
        // 在此处编写响应式调整布局和样式的代码
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        if (mediaQuery.matches) {
          console.log(this);
          // 在此处编写响应式调整布局和样式的代码
        }
      });
    })
  }
});
export default useLayoutStore;
