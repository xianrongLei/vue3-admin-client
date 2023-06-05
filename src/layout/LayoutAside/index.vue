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
          v-for="(item, index) in routerStore.router_asyncRoutes"
          :key="item.key"
          @click="jumpRouter($router, item, index)"
          :class="{ isActive: routerStore.router_activeKey === 'item' ? 'isActive' : '' }"
          class="m-t-6px overflow-hidden h-42px w-42px cursor-pointer bg-pink"
        >
          {{ item.label }}
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
          {{ $route.meta.title }}
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
import { computed, onMounted, ref, watch } from "vue";
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

/**
 * 窄菜单路由跳转
 * @param $router
 * @param route
 */
const jumpRouter = async ($router: Router, route: RouteRecordRaw, index: number) => {
  // 跳转路由
  $router.push(route.path);
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
  routerStore.router_activeKey = $router.currentRoute.value.meta.id as string;
  // 设置数据菜单
  routerStore.useInitMenuData(index);
  layoutStore.useMenuExpand(false);
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
