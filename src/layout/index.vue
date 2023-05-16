<template>
  <div class="app-layout">
    <div class="layout-container">
      <LayoutAside />
      <div
        class="layout-main-container"
        :style="{ zIndex: layoutStore.layout_isLargeWindow ? 4 : 2 }"
      >
        <LayoutHeader />
        <LayoutTabs />
        <LayoutMain />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutTabs from "./layoutTabs/index.vue";
import LayoutMain from "./layoutMain/index.vue";
import LayoutHeader from "./layoutHeader/index.vue";
import LayoutAside from "./layoutAside/index.vue";
import { useLayoutStore } from "@/store/modules/layout";

const layoutStore = useLayoutStore();
layoutStore.useInitLayout();
</script>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;
  width: 100%;
  background-color: var(--subtle-color);
  > .layout-container {
    position: relative;
    height: 100%;
    max-height: 100%;
    display: flex;
    overflow: hidden;
    .layout-main-container {
      display: flex;
      flex-shrink: 0;
      flex-grow: 1;
      flex-direction: column;
    }
  }
}
</style>
