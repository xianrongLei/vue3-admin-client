import { defineStore } from "pinia";
import { ThemeState } from "./theme.types";
import { getThemeConfig } from "./theme.map";

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    theme_mode: "",
    theme_naiveEditor: true,
    theme_cssVars: {},
    theme_naiveOverrides: {}
  }),
  actions: {
    /**
     * state 操作器
     * @param param0
     */
    useThemeStateOperator<Key>(key: keyof ThemeState, value: ThemeState[Key & keyof ThemeState]): void {
      (this as any)[key] = value;
    },
    /**
     * 设置 app 主题
     * @param mode "light" | "dark"
     */
    useThemeSetMode(mode: ThemeState["theme_mode"]) {
      if (mode === this.theme_mode) return;
      const { theme_cssVars, theme_naiveOverrides } = getThemeConfig(mode);
      this.theme_mode = mode;
      this.theme_cssVars = theme_cssVars;
      this.theme_naiveOverrides = theme_naiveOverrides;
      Object.keys(theme_cssVars).forEach((key) => {
        window.document.body.style.setProperty(key, (theme_cssVars as any)[key]);
      });
    }
  }
});
export default useThemeStore;
