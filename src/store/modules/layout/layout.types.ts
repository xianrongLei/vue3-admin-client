export interface LayoutState {
  /**
   *  aside的宽度 单位px
   */
  readonly layout_asideWidth: number;
  /**
   *  宽菜单的宽度 单位px
   */
  readonly layout_shrinkMenuWidth: number;
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
   * 侧边栏ref
   */
  layout_asideRef: null | HTMLElement;
  /**
   * 收缩菜单ref
   */
  layout_shrinkMenuRef: null | HTMLElement;
  /**
   * 抽屉菜单ref
   */
  layout_drawerMenuRef: null | HTMLElement;
  /**
   * 收缩菜单是否展开
   */
  layout_isShrinkMenuExpand: boolean;
  /**
   * 抽屉菜单是否展开
   */
  layout_isDrawerMenuExpand: boolean;
}
