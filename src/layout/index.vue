<template>
  <div class="layout">
    <div
      class="layout-container"
      :style="{ maxHeight: `calc(100% - ${footerHeight})`, height: `calc(100% - ${footerHeight})` }"
    >
      <!-- <LayoutAside :footer-height="footerHeight" :header-height="headerHeight" /> -->
      <div class="layout-container">
        <!-- <LayoutHeader :header-height="headerHeight" /> -->
        <!-- <LayoutTabs /> -->
        <LayoutMain />
      </div>
    </div>
    <!-- <LayoutFooter :footer-height="footerHeight" /> -->
  </div>
</template>

<script lang="ts" setup>
// import LayoutFooter from "./LayoutFooter/index.vue"
// import LayoutTabs from "./LayoutTabs/index.vue"
import LayoutMain from "./LayoutMain/index.vue"
// import LayoutHeader from "./LayoutHeader/index.vue"
// import LayoutAside from "./LayoutAside/index.vue"

const footerHeight = "2.5rem"
// const headerHeight = "3.75rem"
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
