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
import { Ref, computed, defineComponent, ref } from "vue";
import { themeLightOverrides, themeDarkOverrides } from "@/style/index";
import { useThemeStore } from "@/store/modules/theme";

export default defineComponent({
  components: {
    NThemeEditor
  },
  setup() {
    const { theme_naiveEditor, theme_mode, useThemeStateOperator } =
      useThemeStore();
    const theme = ref<GlobalTheme | null>(null);
    const showThemeEditor: boolean = !!theme_naiveEditor;
    const themeOverrides: Ref<GlobalThemeOverrides | null> = ref(null);
    const isLightTheme: boolean = theme_mode === "light";
    const isDarkTheme: boolean = theme_mode === "dark";
    const isWindowDarkMode: boolean = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    type ThemeInfo = {
      classNme: "light" | "dark";
      naiveTheme: GlobalTheme | null;
      overrides: GlobalThemeOverrides;
    };
    const themeInfo = computed((): ThemeInfo => {
      let classNme: "light" | "dark";
      let naiveTheme: GlobalTheme | null;
      let overrides: GlobalThemeOverrides;
      if (isLightTheme) {
        classNme = "light";
        naiveTheme = null;
        overrides = themeLightOverrides;
      } else if (isDarkTheme) {
        classNme = "dark";
        naiveTheme = darkTheme;
        overrides = themeDarkOverrides;
      } else if (isWindowDarkMode) {
        classNme = "dark";
        naiveTheme = darkTheme;
        overrides = themeDarkOverrides;
      } else {
        classNme = "light";
        naiveTheme = null;
        overrides = themeLightOverrides;
      }
      return {
        classNme,
        naiveTheme,
        overrides
      };
    });

    document.body.className = themeInfo.value?.classNme;
    theme.value = themeInfo.value?.naiveTheme;
    themeOverrides.value = themeInfo.value?.overrides;
    useThemeStateOperator<"theme_mode">(
      "theme_mode",
      themeInfo.value?.classNme
    );
    return {
      showThemeEditor,
      themeOverrides,
      theme
    };
  }
});
</script>
