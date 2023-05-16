<template>
  <div class="app-layout">
    <div class="layout-container">
      <LayoutAside />
      <div class="layout-container">
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
  background-color: var(--bg-color);
  > .layout-container {
    height: 100%;
    max-height: 100%;
    display: flex;
    overflow: hidden;

    > .layout-container {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
