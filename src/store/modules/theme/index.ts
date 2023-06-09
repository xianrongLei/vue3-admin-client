import { defineStore } from "pinia";
import { GlobalTheme } from "naive-ui";
import { ThemeMap, useThemeConfig } from "./theme.map";

export interface ThemeState {
  /** 主题模式 */
  theme_mode: "dark" | "light";
  /** naiveUI主题编辑器开关 */
  theme_naiveEditor: boolean;
  /** naiveUI主题颜色覆盖 */
  theme_naiveOverrides: {} | GlobalTheme;
  /** 全局主题css变量 */
  theme_cssVars: {
    /** 页面背景颜色 */
    "--bg-color"?: string;
    /** 用于和背景颜色相衬 */
    "--subtle-color"?: string;
    /** 文本颜色 */
    "--text-color"?: string;
    /** 边框颜色，适合用于边框、分割线或强调元素 */
    "--border-color"?: string;
    /** 遮罩颜色 */
    "--mask-color"?: string;
    /** 阴影颜色的RGB值 */
    "--shadow-color-rgb"?: string;
    /** 基础阴影 */
    "--shadow-base"?: string;
    /** 浅色阴影 */
    "--shadow-shallow"?: string;
    /** 特殊颜色，适合用于特殊元素或强调元素 */
    "--special-color"?: string;

    // !! 下面为暂时没有用到的
    /** 柔和的文本颜色，适合用于正文或次要文本 */
    "--text-soft-color"?: string;

    /** 强烈的文本颜色，适合用于标题、重点和重要信息 */
    "--text-strong-color"?: string;

    /** 阴影颜色，适合用于阴影效果或强调元素 */
    "--shadow-color"?: string;

    /** 输入框颜色，适合用于文本输入框或表单元素 */
    "--input-color"?: string;

    /** 轮廓颜色，适合用于轮廓线或焦点元素 */
    "--outline-color"?: string;

    /** 标记颜色，适合用于高亮或标记文本 */
    "--mark-color"?: string;

    /** 特殊背景颜色，适合用于特殊背景元素或强调元素 */
    "--special-bg-color"?: string;

    /** 特殊文本颜色，适合用于特殊文本元素或强调元素 */
    "--special-text-color"?: string;

    /** 特殊阴影颜色，适合用于特殊阴影效果或强调元素 */
    "--special-shadow-color"?: string;

    /** 特殊标记颜色，适合用于特殊标记或强调元素 */
    "--special-mark-color"?: string;

    /** 浅色文本颜色，适合用于浅色背景或次要文本 */
    "--light-color"?: string;

    /** 深色文本颜色，适合用于深色背景或重要文本 */
    "--dark-color"?: string;

    /** 文本颜色的RGB值 */
    "--text-color-rgb"?: string;

    /** 背景颜色的RGB值 */
    "--bg-color-rgb"?: string;

    /** 柔和颜色的RGB值 */
    "--subtle-color-rgb"?: string;

    /** 特殊颜色的RGB值 */
    "--special-color-rgb"?: string;

    /** 特殊文本颜色的RGB值 */
    "--special-text-color-rgb"?: string;

    /** 特殊背景颜色的RGB值 */
    "--special-bg-color-rgb"?: string;

    /** 特殊阴影颜色的RGB值 */
    "--special-shadow-color-rgb"?: string;

    /** 轮廓颜色的RGB值 */
    "--outline-color-rgb"?: string;

    /** 深色文本颜色的RGB值 */
    "--dark-color-rgb"?: string;

    /** 浅色文本颜色的RGB值 */
    "--light-color-rgb"?: string;
  };
}

export const useThemeStore = defineStore("theme", {
  state: (): ThemeState => ({
    theme_mode: "light",
    theme_naiveEditor: true,
    theme_cssVars: {},
    theme_naiveOverrides: {}
  }),
  cache: {
    theme_mode: {
      type: "local",
      default: "light",
      beforeMounted(cache) {
        if (cache) {
          this.useThemeSetMode(cache);
        } else {
          this.useThemeSetMode(this.theme_mode);
        }
      }
    }
  },
  actions: {
    /**
     * 设置 app 主题
     * @param mode "light" | "dark"
     */
    useThemeSetMode(mode: keyof ThemeMap) {
      const { theme_cssVars, theme_naiveOverrides } = useThemeConfig(mode);
      this.theme_mode = mode;
      this.theme_cssVars = theme_cssVars;
      this.theme_naiveOverrides = theme_naiveOverrides;
      Object.keys(theme_cssVars).forEach((key) => {
        window.document.body.style.setProperty(key, theme_cssVars[key as keyof ThemeState["theme_cssVars"]]!);
      });
    }
  }
});
export default useThemeStore;
