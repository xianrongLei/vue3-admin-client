<template>
  <div class="overflow-hidden flex-shrink-0 flex-grow-0 h-full z-1 bg-[var(--bg-color)]">
    <div
      class="relative flex flex-items-center justify-center font-500 text-7 tracking-3"
      :style="{ height: logoHeight, width: menuWidth }"
    >
      {{ appConfig.appTitle }}
      <n-divider title-placement="center">
        {{ $route.meta.title }}
      </n-divider>
    </div>
    <div class="m-t-20px">
      <n-scrollbar :style="{ maxHeight: scrollbarHeight }">
        <n-menu
          ref="shrinkMenuRef"
          v-model:value="routerStore.router_shrinkWithDrawerMenuKey"
          :on-update:value="updateHandler"
          :collapsed="appStore.app_isShrinkMenuExpand"
          :collapsed-width="0"
          :collapsed-icon-size="0"
          :options="routerStore.router_shrinkMenuData"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
        />
      </n-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, h, onMounted, ref } from "vue";
import { useAppStore } from "@/store/modules/app/index";
import { useRouterStore } from "@/store/modules/router";
import { router } from "@/router";
import ASvgIcon from "@/components/ASvgIcon/index.vue";
import { RouteMenu } from "@/store/modules/router/router.types";
import { appConfig } from "@/config/index";

const { app_headerHeight, app_shrinkMenuWidth } = useAppStore();
const appStore = useAppStore();
const routerStore = useRouterStore();
const renderMenuLabel = (option: RouteMenu) => {
  if (option.meta.outside) {
    return h("a", { href: option.component, target: "_blank" }, { default: () => option.label });
  }
  return option.label;
};
/**
 * 滚动条区域高度 包含footer
 */
const scrollbarHeight = computed(() => `calc(100vh - (${app_headerHeight + 21}px))`);
const [logoHeight, menuWidth] = [
  // logo的高度
  computed(() => `${app_headerHeight}px`),
  // 菜单的宽度
  computed(() => `${app_shrinkMenuWidth}px`)
];
/**
 * 渲染窄菜单图标和label
 * @param option
 */
const renderMenuIcon = (option: RouteMenu) => {
  if (option.meta.icon) {
    return h(
      "div",
      { class: "x-menu-menu-item", title: option.label },
      h(ASvgIcon, { name: option.meta.icon, size: 15, color: "var(--text-color)" })
    );
  }
  return false;
};
/**
 * 更新路由
 * @param _key
 * @param item
 */
const updateHandler = (_key: string, route: RouteMenu) => {
  /**
   * 外链组织跳转路由
   */
  if (route.meta.outside) return;
  router.push(route.path!);
  routerStore.router_shrinkWithDrawerMenuKey = route.key!;
};
const shrinkMenuRef = ref();
onMounted(() => {
  routerStore.router_shrinkMenuRef = shrinkMenuRef;
});
</script>
