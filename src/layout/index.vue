<template>
  <div class="app-layout">
    <div class="layout-container">
      <LayoutAside
        :footer-height="footerHeight"
        :header-height="headerHeight"
      />
      <div class="layout-container">
        <LayoutHeader :header-height="headerHeight" />
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

const footerHeight = "0rem";
const headerHeight = "3.75rem";
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
