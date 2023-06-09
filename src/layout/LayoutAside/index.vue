<template>
  <div
    ref="layout_asideRef"
    style="box-shadow: var(--shadow-shallow); transition: width 0.2s; border-right: 1px solid var(--border-color)"
    class="layout-aside-container h-full flex flex-shrink-0 flex-grow-0 overflow-hidden relative top-0 left-0 z-4 bg-[var(--bg-color)]"
  >
    <!-- 窄菜单 -->
    <div
      ref="layout_xMenuRef"
      style="width: 50px; border-right: 1px solid var(--border-color)"
      class="flex-shrink-0 flex-grow-0 overflow-hidden h-full z-2 bg-[var(--bg-color)]"
    >
      <div
        class="cursor-pointer flex justify-center"
        :style="{ height: logoHeight }"
        @click="useRouter($router, { path: '/index' })"
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
      <div class="p-t-20px flex flex-grow-1 flex-wrap justify-center">
        <n-menu
          v-model:value="routerStore.router_xActiveKey"
          class="flex-grow-1 x-menu-default"
          :class="menuClass"
          :collapsed="layoutStore.layout_isLargeWindow"
          :collapsed-icon-size="28"
          :on-update:value="updateHandler"
          :collapsed-width="50"
          :options="menuData"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
        />
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
import { computed, h, nextTick, onMounted, ref, watch } from "vue";
import { Router } from "vue-router";
import { MenuOption } from "naive-ui";
import { useLayoutStore } from "@/store/modules/layout";
import Menu from "../components/menu.vue";
import { appConfig } from "@/config/index";
import useRouterStore from "@/store/modules/router";
import { router } from "@/router";
import { AsyncRoute } from "@/store/modules/router/router.types";
import ASvgIcon from "@/components/ASvgIcon/index.vue";

const [layoutStore, routerStore] = [useLayoutStore(), useRouterStore()];
const [logoHeight, menuWidth, menuClass] = [
  // logo的高度
  computed(() => `${layoutStore.layout_headerHeight}px`),
  // 菜单的宽度
  computed(() => `${layoutStore.layout_menuWidth}px`),
  // 窄菜单class
  computed(() => (layoutStore.layout_isLargeWindow ? "x-menu" : ""))
];

// 渲染展开时菜单的label
const renderMenuLabel = (option: MenuOption & { label: string; meta: {} }) => {
  if ("outside" in option.meta) {
    return h("a", { href: option.href, target: "_blank" }, [option.label]);
  }
  return option.label;
};
/**
 * 渲染窄菜单图标和label
 * @param option
 */
const renderMenuIcon = (option: MenuOption & { meta: { parentId: string; icon: string } }) => {
  if (option.meta.icon) {
    return h(
      "div",
      { class: "x-menu-menu-item", title: option.label },
      h(ASvgIcon, { name: option.meta.icon, size: 25 })
    );
  }
  return false;
};
/**
 * 窄菜单和抽屉菜单共用一个菜单 需要计算菜单所用的routes
 */
const menuData = computed(() => {
  if (layoutStore.layout_isLargeWindow) {
    return routerStore.router_xMenuData;
  }
  return routerStore.router_asyncRoutes;
});
// 渲染图标占位符以保持缩进
/**
 * 更新路由
 * @param _key
 * @param item
 */
const updateHandler = async (key: string, item: MenuOption) => {
  router.push(item.path as string);
  // 设置当前计划的路由id
  routerStore.router_activeKey = key;
  if (layoutStore.layout_isLargeWindow) {
    routerStore.router_xActiveKey = key;
  } else {
    routerStore.router_xActiveKey = routerStore.router_activeKey;
  }
  // 设置数据菜单
  routerStore.useInitMenuData();
  layoutStore.useMenuExpand(false);
};

/**
 * 窄菜单路由跳转
 * @param $router
 * @param route
 */
const useRouter = async ($router: Router, route: AsyncRoute | { path: string }) => {
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
  routerStore.router_xActiveKey = $router.currentRoute.value.meta.id as string;
  // 设置数据菜单
  routerStore.useInitMenuData();
  layoutStore.useMenuExpand(false);
};
/**
 * 1.禁用窄菜单收缩时的hover事件
 * 2.在模式更改菜单重新渲染后继续禁用
 */
const beenMouseenter = () => {
  document.querySelectorAll(".x-menu .n-menu-item-content").forEach((el: Record<string, any>) => {
    // eslint-disable-next-line no-underscore-dangle
    el.removeEventListener("mouseenter", el._vei.onMouseenter, false);
  });
};
watch(
  () => layoutStore.layout_isLargeWindow,
  () => {
    nextTick(() => {
      beenMouseenter();
    });
  },
  {
    immediate: true
  }
);

// 初始化侧边栏
const [layout_xMenuRef, layout_asideRef, layout_menuRef, layout_maskRef] = [ref(null), ref(null), ref(null), ref(null)];
onMounted(() => {
  layoutStore.layout_asideRef = layout_asideRef.value;
  layoutStore.layout_xMenuRef = layout_xMenuRef.value;
  layoutStore.layout_menuRef = layout_menuRef.value;
  layoutStore.layout_maskRef = layout_maskRef.value;
});
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
  .x-menu-default {
    :deep(.n-menu-item-content) {
      .x-menu-menu-item {
        display: flex;
        align-items: center;
        padding-bottom: 4px;
      }
    }
  }
  .x-menu {
    width: 100%;
    :deep(.n-menu-item-content--selected) {
      &::before {
        background-color: rgba(var(--special-color-rgb), 0.8) !important;
      }
    }
    :deep(.n-menu-item-content) {
      pointer-events: visible;
      padding: 0 !important;
      margin: 0 4px;
      width: calc(100% - 8px);
      display: flex;
      &::before {
        left: 0px;
        right: 0px;
        background-color: rgba(var(--special-color-rgb), 0.2);
      }
      &:hover {
        &::before {
          background-color: rgba(var(--special-color-rgb), 0.4);
        }
      }

      .n-menu-item-content-header {
        display: none !important;
      }
      .n-menu-item-content__icon {
        pointer-events: none;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;

        .x-menu-menu-item {
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          white-space: nowrap;
          padding-top: 2px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
