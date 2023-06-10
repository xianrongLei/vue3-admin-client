<template>
  <n-drawer
    v-model:show="layoutStore.layout_isDrawerMenuExpand"
    :width="layout_asideWidth"
    placement="left"
  >
    <div
      style="width: 260px; border-right: 1px solid var(--border-color)"
      class="flex-shrink-0 flex-grow-0 overflow-hidden h-full z-2 bg-[var(--bg-color)] fixed"
    >
      <div
        class="cursor-pointer flex justify-center"
        :style="{ height: logoHeight }"
        @click="goToHome($router)"
      >
        <img
          src="@/assets/logo.png"
          class="m-3"
          :style="{ maxWidth: logoHeight, maxHeight: logoHeight }"
        />
        <div class="m-l-3 flex flex-items-center justify-center font-500 text-9 tracking-3">
          {{ appConfig.appTitle }}
        </div>
      </div>
      <div class="p-t-20px flex flex-grow-1 flex-wrap justify-center">
        <n-scrollbar :style="{ maxHeight: scrollbarHeight }">
          <n-menu
            v-model:value="routerStore.router_shrinkWithDrawerMenuKey"
            class="flex-grow-1 x-menu-default"
            :on-update:value="updateHandler"
            :collapsed-width="50"
            :options="routerStore.router_asyncRoutes"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
          />
        </n-scrollbar>
      </div>
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { computed, h, watch } from "vue";
import { Router } from "vue-router";
import useLayoutStore from "@/store/modules/layout";
import { useRouterStore } from "@/store/modules/router";
import { AsyncRoute } from "@/store/modules/router/router.types";
import ASvgIcon from "@/components/ASvgIcon/index.vue";
import { router } from "@/router";
import { appConfig } from "@/config/index";

const { layout_asideWidth } = useLayoutStore();
const [layoutStore, routerStore] = [useLayoutStore(), useRouterStore()];
const [logoHeight] = [computed(() => `${layoutStore.layout_headerHeight}px`)];

// 渲染图标占位符以保持缩进
/**
 * 更新路由
 * @param _key
 * @param item
 */
const updateHandler = async (key: string, route: AsyncRoute) => {
  /**
   * 外链组织跳转路由
   */
  if (route.meta.outside) return;
  layoutStore.useMenuExpand(false);
  router.push(route.path);
  // 根据抽屉菜单id设置收缩菜单和小菜单数据
  const [select, index]: [AsyncRoute, number] = routerStore.router_asyncRoutes
    .map((e, i) => {
      const result = routerStore.useFindRouteById(
        {
          arr: [e],
          id_field: "key",
          value: route.key
        },
        []
      );
      return [result, i];
    })
    .filter((e) => e[0])[0] as any;
  routerStore.router_shrinkWithDrawerMenuKey = select.key;
  routerStore.router_shrinkMenuData = [routerStore.router_asyncRoutes[index]];
  routerStore.router_smallMenuKey = index;
};
const scrollbarHeight = computed(() => `calc(100vh - (${layoutStore.layout_headerHeight + 21}px))`);
/**
 * 窄菜单路由跳转
 * @param $router
 * @param route
 */
const goToHome = async ($router: Router) => {
  // 跳转路由
  $router.push("/index");
  // 等待路跳转完毕
  const isRepeat = await new Promise<boolean>((resolve) => {
    const unwatch = watch($router.currentRoute, () => {
      unwatch();
      resolve(false);
    });
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
  // 如果为真表示重复点击
  if (isRepeat) return;
  // 设置当前计划的路由id
  // routerStore.router_activeKey = $router.currentRoute.value.meta.id as string;
  // routerStore.router_xActiveKey = $router.currentRoute.value.meta.id as string;
  // 设置数据菜单
  routerStore.useSetShrinkMenuData();
  layoutStore.useMenuExpand(false);
};

// 渲染展开时菜单的label
const renderMenuLabel = (option: AsyncRoute) => {
  if (option.meta.outside) {
    return h("a", { href: option.meta.component, target: "_blank" }, option.label);
  }
  return option.label;
};
/**
 * 渲染窄菜单图标和label
 * @param option
 */
const renderMenuIcon = (option: AsyncRoute) => {
  if (option.meta.icon) {
    if (option.meta.outside) {
      return h(
        "a",
        { class: "x-menu-menu-item", title: option.label, href: option.meta.component, target: "_blank" },
        h(ASvgIcon, { name: option.meta.icon, size: 15, color: "var(--text-color)" })
      );
    }
    return h(
      "div",
      { class: "x-menu-menu-item", title: option.label },
      h(ASvgIcon, { name: option.meta.icon, size: 15, color: "var(--text-color)" })
    );
  }
  return null;
};
</script>
