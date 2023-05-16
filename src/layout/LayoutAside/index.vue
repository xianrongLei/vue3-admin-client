<template>
  <div
    ref="layout_asideRef"
    class="layout-aside"
  >
    <!-- 窄菜单 -->
    <div
      ref="layout_xMenuRef"
      class="layout-aside-xMenu"
    >
      <div
        class="logo-container"
        :style="{ height: logoHeight }"
        @click="router.push('/')"
      >
        <img
          src="@/assets/logo.png"
          :style="{ maxWidth: logoHeight, maxHeight: logoHeight }"
        />
        <div
          class="title-container"
          v-show="!layoutStore.layout_isLargeWindow && layoutStore.layout_isMenuExpand"
        >
          {{ appConfig.appTitle }}
        </div>
      </div>
    </div>
    <teleport to="body">
      <div
        ref="layout_maskRef"
        class="layout-aside-xMenu-mask"
        @click="layoutStore.useMenuExpand()"
      ></div>
    </teleport>
    <!-- 收缩菜单 -->
    <div
      ref="layout_menuRef"
      class="layout-aside-menu"
    >
      <div
        class="title-container"
        :style="{ height: logoHeight, width: menuWidth }"
      >
        {{ appConfig.appTitle }}
        <n-divider title-placement="center">
          {{ appConfig.appTitle }}
        </n-divider>
      </div>
      <div class="menu-container">士大夫感到</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { router } from "@/router/index";
import { useLayoutStore } from "@/store/modules/layout";
import { appConfig } from "@/config/index";

const layoutStore = useLayoutStore();
const layout_xMenuRef = ref(null);
const layout_asideRef = ref(null);
const layout_menuRef = ref(null);
const layout_maskRef = ref(null);

const logoHeight = computed(() => `${layoutStore.layout_headerHeight}px`);
const menuWidth = computed(() => `${layoutStore.layout_menuWidth}px`);

// 初始化侧边栏
onMounted(() => {
  layoutStore.useLayoutStateOperator("layout_asideRef", layout_asideRef.value);
  layoutStore.useLayoutStateOperator("layout_xMenuRef", layout_xMenuRef.value);
  layoutStore.useLayoutStateOperator("layout_menuRef", layout_menuRef.value);
  layoutStore.useLayoutStateOperator("layout_maskRef", layout_maskRef.value);
});
</script>

<style>
.layout-aside-xMenu-mask {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--mask-color);
  z-index: 3;
}
</style>

<style lang="scss" scoped>
.layout-aside {
  height: 100%;
  border-right: 1px solid var(--border-color);
  box-shadow: 0px 0px 15px 2px rgba(var(--shadow-color-rgb), 0.2);
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  transition: width 0.2s;
  position: relative;
  top: 0;
  left: 0;
  z-index: 4;
  overflow: hidden;
  background-color: var(--bg-color);
  .layout-aside-xMenu {
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
    border-right: 1px solid var(--border-color);
    background-color: var(--bg-color);
    z-index: 2;
    .logo-container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      img {
        margin: 10px;
      }
      .title-container {
        margin-left: 10px;
      }
    }
  }
  .layout-aside-menu {
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
    background-color: var(--bg-color);
    z-index: 1;
    .title-container {
      position: relative;
      :deep(.n-divider) {
        padding: 0 10px;
        margin: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: normal;
        transform: translateY(50%);
      }
    }
  }
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bolder;
    letter-spacing: 10px;
  }
}
</style>
