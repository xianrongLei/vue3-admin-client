<template>
  <n-config-provider :theme-overrides="themeStore.theme_naiveOverrides">
    <NThemeEditor v-if="themeStore.theme_naiveEditor" />
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NThemeEditor } from "naive-ui";
import { useThemeStore } from "@/store/modules/theme/index";
import { useLayoutStore } from "@/store/modules/layout";

const themeStore = useThemeStore();
const layoutStore = useLayoutStore();
// 初始化主题
themeStore.useThemeSetMode("dark");
// 初始化布局
layoutStore.useInitLayout();
</script>
