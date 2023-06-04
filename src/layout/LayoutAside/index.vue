<template>
  <div
    ref="layout_asideRef"
    style="box-shadow: var(--shadow-shallow); transition: width 0.2s; border-right: 1px solid var(--border-color)"
    class="layout-aside-container h-full flex flex-shrink-0 flex-grow-0 overflow-hidden relative top-0 left-0 z-4 bg-[var(--bg-color)]"
  >
    <!-- 窄菜单 -->
    <div
      ref="layout_xMenuRef"
      style="width: 49px; border-right: 1px solid var(--border-color)"
      class="flex-shrink-0 flex-grow-0 overflow-hidden h-full z-2 bg-[var(--bg-color)]"
    >
      <div
        class="cursor-pointer flex justify-center"
        :style="{ height: logoHeight }"
        @click="
          $router.push('/');
          layoutStore.useInitLayout();
        "
      >
        <img
          src="@/assets/logo.png"
          class="m-3"
          :style="{ maxWidth: logoHeight, maxHeight: logoHeight }"
        />
        <div
          class="m-l-3 flex flex-items-center justify-center font-500 text-9 tracking-3"
          v-show="!layoutStore.layout_isLargeWindow && layoutStore.layout_isMenuExpand"
        >
          {{ appConfig.appTitle }}
        </div>
      </div>
      <div class="p-t-20px flex flex-wrap justify-center">
        <div
          v-for="item in routerStore.router_asyncRoutes"
          :key="item.name"
          @click="jumpRouter($router, item)"
          class="m-t-6px overflow-hidden h-42px w-42px cursor-pointer bg-pink"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 收缩菜单 -->
    <div
      ref="layout_menuRef"
      class="overflow-hidden flex-shrink-0 flex-grow-0 h-full z-1 bg-[var(--bg-color)]"
    >
      <div
        class="relative flex flex-items-center justify-center font-500 text-7 tracking-3"
        :style="{ height: logoHeight, width: menuWidth }"
      >
        {{ appConfig.appTitle }}
        <n-divider title-placement="center">
          {{ appConfig.appTitle }}
        </n-divider>
      </div>
      <Menu />
    </div>
    <!-- 窄设备时菜单遮罩 -->
    <teleport to="body">
      <div
        ref="layout_maskRef"
        style="background-color: var(--mask-color)"
        class="hidden absolute top-0 left-0 w-screen h-screen z-3"
        @click="layoutStore.useMenuExpand()"
      ></div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { RouteRecordRaw, Router } from "vue-router";
import { useLayoutStore } from "@/store/modules/layout";
import Menu from "../components/menu.vue";
import { appConfig } from "@/config/index";
import useRouterStore from "@/store/modules/router";

const layoutStore = useLayoutStore();
const routerStore = useRouterStore();
const layout_xMenuRef = ref(null);
const layout_asideRef = ref(null);
const layout_menuRef = ref(null);
const layout_maskRef = ref(null);

const logoHeight = computed(() => `${layoutStore.layout_headerHeight}px`);
const menuWidth = computed(() => `${layoutStore.layout_menuWidth}px`);

// 初始化侧边栏
onMounted(() => {
  layoutStore.layout_asideRef = layout_asideRef.value;
  layoutStore.layout_xMenuRef = layout_xMenuRef.value;
  layoutStore.layout_menuRef = layout_menuRef.value;
  layoutStore.layout_maskRef = layout_maskRef.value;
});

const jumpRouter = ($router: Router, route: RouteRecordRaw & any) => {
  $router.push(route.path);
  const activeMenus = routerStore.router_asyncRoutes.filter((item: any) => item.key === route.key);
  routerStore.router_menuData = activeMenus;
  routerStore.router_activeKey = (activeMenus[0] as any).key;
  layoutStore.useMenuExpand(false);
  console.log(activeMenus, activeMenus[0].path);
  // layoutStore.layout_menuInstRef?.value?.showOption(route.key);
};
</script>

<style lang="scss" scoped>
.layout-aside-container {
  :deep(.n-divider) {
    padding: 0 10px;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    font-weight: 400;
    transform: translateY(50%);
  }
}
</style>
