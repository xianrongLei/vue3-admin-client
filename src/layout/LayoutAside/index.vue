<template>
  <div
    class="layout-aside"
    :style="{ width: asideWidth, maxWidth: asideWidth, minWidth: asideWidth }"
  >
    <!-- 窄菜单 -->
    <div
      class="layout-aside-narrowMenu"
      :style="{ width: narrowMenuWidth }"
    >
      <div
        class="logo-container"
        :style="{ height: logoHeight }"
        @click="router.push('/')"
      >
        <img src="@/assets/logo.png" />
      </div>
    </div>
    <!-- 收缩菜单 -->
    <div
      class="layout-aside-contractMenu"
      :style="{ width: menuWidth, maxWidth: menuWidth, minWidth: menuWidth }"
    >
      <div
        class="title-container"
        :style="{ height: logoHeight }"
      >
        sdf
      </div>
      <div class="menu-container">士大夫感到</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { router } from "@/router/index";
import { useLayoutStore } from "@/store/modules/layout";

const { layout_asideWidth, layout_headerHeight, layout_menuWidth, layout_narrowMenuWidth } = useLayoutStore();
// 侧边栏宽
const asideWidth = `${layout_asideWidth}px`;
// logo和appName高度 与导航栏保持一致
const logoHeight = `${layout_headerHeight}px`;
// 收缩菜单宽
const menuWidth = `${layout_menuWidth}px`;
// 窄菜单宽
const narrowMenuWidth = `${layout_narrowMenuWidth}px`;
</script>

<style lang="scss" scoped>
.layout-aside {
  border-right: 1px solid var(--border-color);
  display: flex;
  .layout-aside-narrowMenu {
    height: 100%;
    border-right: 1px solid var(--border-color);
    .logo-container {
      cursor: pointer;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
  .layout-aside-contractMenu {
    height: 100%;
    .title-container {
      border-bottom: 1px solid var(--border-color);
    }
  }
}
</style>
