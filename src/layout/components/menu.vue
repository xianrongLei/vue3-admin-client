<template>
  <div class="m-t-20px">
    <n-scrollbar :style="{ maxHeight: scrollbarHeight }">
      <n-menu
        ref="menuInstRef"
        v-model:value="routerStore.router_activeKey"
        :on-update:value="updateHandler"
        :collapsed="layoutStore.layout_isMenuExpand"
        :collapsed-width="0"
        :collapsed-icon-size="0"
        :options="routerStore.router_menuData"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
      />
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { MenuOption } from "naive-ui";
import { computed, h, onMounted, ref } from "vue";
import { useLayoutStore } from "@/store/modules/layout/index";
import useRouterStore from "@/store/modules/router";
import { router } from "@/router";
import ASvgIcon from "@/components/ASvgIcon/index.vue";

const layoutStore = useLayoutStore();
const routerStore = useRouterStore();
const renderMenuLabel = (option: MenuOption & { label: string; meta: {} }) => {
  if ("outside" in option.meta) {
    return h("a", { href: option.href, target: "_blank" }, option.label);
  }
  return option.label;
};
/**
 * 滚动条区域高度 包含footer
 */
const scrollbarHeight = computed(() => `calc(100vh - (${layoutStore.layout_headerHeight + 21}px))`);

/**
 * 渲染窄菜单图标和label
 * @param option
 */
const renderMenuIcon = (option: MenuOption & { meta: { parentId: string; icon: string } }) => {
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
const updateHandler = (_key: string, item: MenuOption) => {
  router.push(item.path as string);
  routerStore.router_activeKey = item.key as string;
};
/**
 * 将菜单组件存入store
 */
const menuInstRef = ref(null);
onMounted(() => {
  routerStore.router_menuInstRef = menuInstRef;
});
</script>

<style lang="scss" scoped></style>
