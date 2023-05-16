<template>
  <div
    class="layout-header"
    :style="{ height: headerHeight }"
  >
    <button @click="layoutStore.useMenuExpand()">menu</button>
    <button @click="themeStore.useThemeSetMode(themeStore.theme_mode === 'dark' ? 'light' : 'dark')">mode</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { useThemeStore } from "@/store/modules/theme";

const layoutStore = useLayoutStore();
const themeStore = useThemeStore();
const headerHeight = computed(() => `${layoutStore.layout_headerHeight}px`);
</script>

<style lang="scss" scoped>
.layout-header {
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
}
</style>
