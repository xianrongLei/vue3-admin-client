<template>
  <div
    style="background-color: var(--subtle-color)"
    class="app-layout-container h-screen w-full"
  >
    <div class="h-full max-h-full flex relative overflow-hidden">
      <LayoutAside />
      <div
        class="flex-col flex-shrink-0 flex-grow-1"
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
