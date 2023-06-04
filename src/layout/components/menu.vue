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
import { BookmarkOutline } from "@vicons/ionicons5";
import { MenuOption, NIcon } from "naive-ui";
import { h, onMounted, ref } from "vue";
import { useLayoutStore } from "@/store/modules/layout/index";
import useRouterStore from "@/store/modules/router";
import { router } from "@/router";

const layoutStore = useLayoutStore();
const routerStore = useRouterStore();
const renderMenuLabel = (option: MenuOption) => {
  if ("href" in option) {
    return h("a", { href: option.href, target: "_blank" }, option.label as string);
  }
  return option.label as string;
};
const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
};
const updateHandler = (_key: string, item: MenuOption) => {
  router.push(item.path as string);
};

const menuInstRef = ref();
onMounted(() => {
  layoutStore.layout_menuInstRef = menuInstRef;
});
</script>

<style lang="scss" scoped></style>
