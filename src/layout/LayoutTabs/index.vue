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
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
}
</style>
