import { defineStore } from "pinia";
import { ThemeState } from "./types";

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    theme_mode: "dark",
    theme_naiveEditor: false,
    theme_cssVar: {
      "--bg-color": "rgba(255, 255, 255, 1)",
      "--text-color": "rgba(40, 48, 66, 1)",
      "--text-soft-color": "rgba(69, 74, 87, 1)",
      "--text-strong-color": "rgba(74, 74, 74, 1)",
      "--subtle-color": "rgba(248, 249, 253, 1)",
      "--border-color": "rgba(225, 231, 247, 1)",
      "--shadow-color": "rgba(179, 191, 222, 1)",
      "--input-color": "rgba(255, 255, 255, 1)",
      "--outline-color": "rgba(175, 191, 231, 1)",
      "--mark-color": "rgba(74, 127, 208, 0.08)",
      "--special-color": "rgba(74, 127, 208, 1)",
      "--special-bg-color": "rgba(77, 131, 214, 1)",
      "--special-text-color": "rgba(255, 255, 255, 1)",
      "--special-shadow-color": "rgba(78, 89, 114, 1)",
      "--special-mark-color": "rgba(255, 255, 255, 0.08)",
      "--light-color": "rgba(240, 243, 252, 1)",
      "--dark-color": "rgba(62, 71, 91, 1)",
      "--text-color-rgb": "40, 48, 66",
      "--bg-color-rgb": "255, 255, 255",
      "--subtle-color-rgb": "248, 249, 253",
      "--special-color-rgb": "74, 127, 208",
      "--special-text-color-rgb": "255, 255, 255",
      "--special-bg-color-rgb": "77, 131, 214",
      "--shadow-color-rgb": "179, 191, 222",
      "--special-shadow-color-rgb": "78, 89, 114",
      "--outline-color-rgb": "175, 191, 231",
      "--dark-color-rgb": "62, 71, 91",
      "--light-color-rgb": "240, 243, 252"
    },
    theme_naiveOverrides: {
      common: {
        primaryColor: "rgba(80, 120, 200, 1)",
        primaryColorHover: "rgba(80, 120, 200, 1)"
      }
      // 暗黑
      // common: {
      //   primaryColor: "rgba(80, 120, 200, 1)",
      //   primaryColorHover: "rgba(80, 120, 200, 1)"
      // }
    }
  }),
  actions: {
    /**
     * state 操作器
     * @param param0
     */
    useThemeStateOperator<Key>(
      key: keyof ThemeState,
      value: ThemeState[Key & keyof ThemeState]
    ): void {
      (this as any)[key] = value;
    },
    /**
     * 设置 app 主题
     * @param mode
     * @param cssVar
     * @param naiveOverrides
     */
    useThemeSetMode(
      mode: ThemeState["theme_mode"],
      cssVar: ThemeState["theme_cssVar"],
      naiveOverrides: ThemeState["theme_naiveOverrides"]
    ) {
      console.log(mode, cssVar, naiveOverrides);
    },
    /**
     * 随机主题生成器
     */
    useThemeGenerateRandomMode() {}
  }
});
export default useThemeStore;
