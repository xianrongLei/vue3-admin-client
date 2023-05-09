<template>
  <n-config-provider :theme-overrides="theme_naiveOverrides">
    <NThemeEditor v-if="theme_naiveEditor" />
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

const { theme_naiveEditor, theme_naiveOverrides, useThemeSetMode } =
  useThemeStore();

useThemeSetMode("dark");
</script>
