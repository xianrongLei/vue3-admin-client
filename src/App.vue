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
import Store from "@/store";

export default defineComponent({
  components: {
    NThemeEditor
  },
  setup() {
    const { userInfo } = Store.user;
    const theme = ref<GlobalTheme | null>(null);
    const themeOverrides = ref<GlobalThemeOverrides | null>(null);
    if (userInfo.theme === "light") {
      theme.value = null;
      themeOverrides.value = themeLightOverrides;
    } else if (userInfo.theme === "dark") {
      theme.value = darkTheme;
      themeOverrides.value = themeDarkOverrides;
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme:dark)");
      if (isDark) {
        document.body.className = "dark";
        themeOverrides.value = themeDarkOverrides;
        theme.value = darkTheme;
      } else {
        document.body.className = "light";
        themeOverrides.value = themeDarkOverrides;
        theme.value = null;
      }
    }
    const showThemeEditor = userInfo.themeEditor;
    return {
      showThemeEditor,
      themeOverrides,
      theme
    };
  }
});
</script>
