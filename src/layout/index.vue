<template>
  <div class="app-layout-container h-screen w-full bg-[var(--subtle-color)]">
    <div class="h-full max-h-full flex relative overflow-hidden">
      <LayoutAside />
      <div
        class="flex-col flex-shrink-0 flex-grow-1 shadow-y-1px flex-basis-0 overflow-hidden"
        :style="{ zIndex: appStore.app_isLargeWindow ? 4 : 2 }"
      >
        <div
          class="z-4 relative bg-[var(--bg-color)]"
          style="
            box-shadow: 6px 0 5px 2px rgba(var(--shadow-color-rgb), 0.2);
            border-bottom: 1px solid var(--border-color);
          "
        >
          <LayoutHeader />
          <LayoutTabs />
        </div>
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
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
appStore.useWindowResize();
</script>
