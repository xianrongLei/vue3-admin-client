<template>
  <div
    class="layout-tabs"
    :style="{ height: tabsHeight }"
  ></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useLayoutStore from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const tabsHeight = computed(() => `${layoutStore.layout_tabsHeight}px`);
</script>

<style lang="scss" scoped>
.layout-tabs {
  box-shadow: 5px 0 5px 2px rgba(var(--shadow-color-rgb), 0.2);
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  z-index: 1;
}
</style>
