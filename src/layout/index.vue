<template>
  <div class="layout">
    <div
      class="layout-container"
      :style="{
        maxHeight: `calc(100% - ${footerHeight})`,
        height: `calc(100% - ${footerHeight})`
      }"
    >
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
    <LayoutFooter :footer-height="footerHeight" />
  </div>
</template>

<script lang="ts" setup>
import LayoutFooter from "./layoutFooter/index.vue";
import LayoutTabs from "./layoutTabs/index.vue";
import LayoutMain from "./layoutMain/index.vue";
import LayoutHeader from "./layoutHeader/index.vue";
import LayoutAside from "./layoutAside/index.vue";

const footerHeight = "2.5rem";
const headerHeight = "3.75rem";
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;

  > .layout-container {
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
