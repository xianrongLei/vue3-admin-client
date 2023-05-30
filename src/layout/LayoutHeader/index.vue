<template>
  <div
    class="layout-header flex-shrink-0 flex-grow-0"
    :style="{ height: headerHeight }"
    style="border-bottom: 1px solid var(--border-color)"
  >
    <button @click="layoutStore.useMenuExpand()">menu</button>
    <button @click="themeStore.useThemeSetMode(themeStore.theme_mode === 'dark' ? 'light' : 'dark')">mode</button>
    <button @click="checkLang">lang</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLayoutStore } from "@/store/modules/layout";
import { useThemeStore } from "@/store/modules/theme";

const layoutStore = useLayoutStore();
const themeStore = useThemeStore();
const headerHeight = computed(() => `${layoutStore.layout_headerHeight}px`);

const { locale } = useI18n();
const checkLang = () => {
  locale.value = locale.value === "zh" ? "en" : "zh";
};
</script>
