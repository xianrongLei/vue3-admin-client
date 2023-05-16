<template>
  <div
    ref="layout_asideRef"
    class="layout-aside"
  >
    <!-- 窄菜单 -->
    <div
      ref="layout_xMenuRef"
      class="layout-aside-narrowMenu"
    >
      <div
        class="logo-container"
        @click="router.push('/')"
      >
        <img src="@/assets/logo.png" />
      </div>
    </div>
    <!-- 收缩菜单 -->
    <div
      ref="layout_menuRef"
      class="layout-aside-contractMenu"
    >
      <div class="title-container">sdf</div>
      <div class="menu-container">士大夫感到</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { router } from "@/router/index";
import { useLayoutStore } from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const layout_xMenuRef = ref(null);
const layout_asideRef = ref(null);
const layout_menuRef = ref(null);
// 初始化侧边栏
layoutStore.useLayoutStateOperator<"layout_asideRef">("layout_asideRef", layout_asideRef);
layoutStore.useLayoutStateOperator<"layout_xMenuRef">("layout_xMenuRef", layout_xMenuRef);
layoutStore.useLayoutStateOperator<"layout_menuRef">("layout_menuRef", layout_menuRef);
</script>

<style lang="scss" scoped>
.layout-aside {
  border-right: 1px solid var(--border-color);
  display: flex 0 0;
  overflow: hidden;
  transition: width 0.3s ease-out;
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
