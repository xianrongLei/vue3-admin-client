<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <NThemeEditor v-if="showThemeEditor" />
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { NThemeEditor, darkTheme, GlobalThemeOverrides } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { defineComponent, ref } from "vue";
import { themeLightOverrides, themeDarkOverrides } from "@/style/index";
import userStore from "@/store/modules/user";

export default defineComponent({
  components: {
    NThemeEditor
  },
  setup() {
    const { userInfo } = userStore();
    const theme = ref<GlobalTheme | null>(null);
    const showThemeEditor = userInfo.themeEditor;
    const themeOverrides = ref<GlobalThemeOverrides | null>(null);
    const isLightTheme: boolean = userInfo.theme === "light";
    const isDarkTheme: boolean = userInfo.theme === "dark";
    const isWindowDarkMode: boolean = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isLightTheme) {
      theme.value = null;
      themeOverrides.value = themeLightOverrides;
    } else if (isDarkTheme) {
      theme.value = darkTheme;
      themeOverrides.value = themeDarkOverrides;
    } else if (isWindowDarkMode) {
      document.body.className = "dark";
      themeOverrides.value = themeDarkOverrides;
      theme.value = darkTheme;
    } else {
      document.body.className = "light";
      themeOverrides.value = themeDarkOverrides;
      theme.value = null;
    }

    return {
      showThemeEditor,
      themeOverrides,
      theme
    };
  }
});
</script>
