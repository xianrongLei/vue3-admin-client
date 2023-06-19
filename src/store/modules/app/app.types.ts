export interface AppState {
  /**
   *  aside的宽度 单位px
   */
  readonly app_asideWidth: number;
  /**
   *  宽菜单的宽度 单位px
   */
  readonly app_shrinkMenuWidth: number;
  /**
   *  header的高度 单位px
   */
  readonly app_headerHeight: number;
  /**
   *  tabs的高度 单位px
   */
  readonly app_tabsHeight: number;
  /**
   *  底部信息栏的高度 单位px
   */
  readonly app_footerHeight: number;
  /**
   * 窗口多大时隐藏侧边栏
   */
  readonly app_minWidth: number;
  /**
   * 是否是小窗口
   */
  app_isLargeWindow: boolean;
  /**
   * 侧边栏ref
   */
  app_asideRef: null | HTMLElement;
  /**
   * 收缩菜单ref
   */
  app_shrinkMenuRef: null | HTMLElement;
  /**
   * 抽屉菜单ref
   */
  app_drawerMenuRef: null | HTMLElement;
  /**
   * 收缩菜单是否展开
   */
  app_isShrinkMenuExpand: boolean;
  /**
   * 抽屉菜单是否展开
   */
  app_isDrawerMenuExpand: boolean;
  /**
   * tabs
   */
}
