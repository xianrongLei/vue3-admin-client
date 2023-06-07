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
import { MenuOption, NIcon } from "naive-ui";
import { h, onMounted, ref } from "vue";
import { useLayoutStore } from "@/store/modules/layout/index";
import useRouterStore from "@/store/modules/router";
import { router } from "@/router";

const layoutStore = useLayoutStore();
const routerStore = useRouterStore();
const renderMenuLabel = (option: MenuOption & any) => {
  if ("outside" in option.meta) {
    console.log(option.meta.outside);

    return h("a", { href: option.href, target: "_blank" }, option.label as string);
  }
  return option.label as string;
};

const renderMenuIcon = (option: MenuOption & { meta: { icon: string } }) => {
  option.meta.icon = "Add";
  // if (option.meta.icon) {
  //   return h(NIcon, null, { default: () => h(icons[option.meta.icon]) });
  // }
  return false;

  // // 渲染图标占位符以保持缩进
  // if (option.key === "sheep-man") return true;
  // // 返回 falsy 值，不再渲染图标及占位符
  // if (option.key === "food") return null;
  // return h(NIcon, null, { default: () => h(BookmarkOutline) });
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
