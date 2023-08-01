<template>
  <div
    class="layout-small-menu"
    style="width: 50px; border-right: 1px solid var(--border-color)"
  >
    <div
      class="cursor-pointer flex justify-center"
      :style="{ height: logoHeight }"
      @click="goToHome($route.path)"
    >
      <img
        src="@/assets/logo.png"
        class="m-3"
        :style="{ maxWidth: logoHeight, maxHeight: logoHeight }"
      />
    </div>
    <div class="m-t-25px">
      <div
        v-for="(item, index) in routerStore.router_asyncRoutes"
        :key="index"
        class="h-42px flex justify-center items-center m-b-6px box-border"
      >
        <div class="w-full h-full flex justify-center items-center p-x-4px box-border">
          <div
            @click="routerHandler(item, index)"
            :title="item.label!"
            :class="index === routerStore.router_smallMenuKey ? 'menu-icon-active' : ''"
            class="menu-icon flex justify-center items-center w-full h-full box-border b-rd-5px bg-[rgba(var(--special-color-rgb),0.1)] cursor-pointer"
          >
            <a-svg-icon
              :name="item.meta.icon"
              :size="26"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useRouterStore } from "@/store/modules/router";
import type { RouteMenu } from "@/store/modules/router/router.types";
import { router } from "@/router";

const routerStore = useRouterStore();
const { app_headerHeight, useMenuExpand } = useAppStore();

const logoHeight = computed(() => `${app_headerHeight}px`);

/**
 * 跳转到首页
 * @param _key
 * @param item
 */
const goToHome = async (activePath: string) => {
  // 跳转路由
  router.push("/index");
  // 如果为真表示重复点击
  if (activePath !== "/index") routerStore.useSetShrinkMenuData();
  // 设置数据菜单
  useMenuExpand(false);
};
/**
 * 跳转路由
 * @param _key
 * @param item
 */
const routerHandler = (route: RouteMenu, index: number) => {
  if (routerStore.router_smallMenuKey === index) return;
  routerStore.router_shrinkMenuData = [route];
  routerStore.router_smallMenuKey = index;
  const select = routerStore.useFindRouteByKey(
    {
      arr: [route],
      id_field: "show",
      value: true
    },
    []
  );
  router.push(select.path as string);
  routerStore.router_shrinkWithDrawerMenuKey = select.key as string;
  useMenuExpand(false);
  nextTick(() => {
    routerStore.router_shrinkMenuRef?.showOption(select.key);
  });
};
</script>

<style lang="scss">
.layout-small-menu {
  .menu-icon-active {
    background: rgba(var(--special-color-rgb), 0.8) !important;
  }
  .menu-icon {
    transition: background-color 0.4s ease-in-out;
    &:hover {
      background: rgba(var(--special-color-rgb), 0.3);
    }
  }
}
</style>
