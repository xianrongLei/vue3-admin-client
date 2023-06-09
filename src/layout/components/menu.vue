<template>
  <div class="p-t-20px">
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
  </div>
</template>

<script lang="ts" setup>
import { MenuOption } from "naive-ui";
import { h, onMounted, ref } from "vue";
import { useLayoutStore } from "@/store/modules/layout/index";
import useRouterStore from "@/store/modules/router";
import { router } from "@/router";

const layoutStore = useLayoutStore();
const routerStore = useRouterStore();
const renderMenuLabel = (option: MenuOption & { label: string; meta: {} }) => {
  if ("outside" in option.meta) {
    return h("a", { href: option.href, target: "_blank" }, option.label);
  }
  return option.label;
};

const renderMenuIcon = (option: MenuOption & { meta: { icon: string } }) => {
  // console.log(option);
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
  console.log(routerStore.router_menuData);
});
</script>

<style lang="scss" scoped></style>
