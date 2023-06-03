import { GlobalTheme, darkTheme, lightTheme } from "naive-ui";
import { ThemeState } from "./index";

export type ThemeMap = {
  dark: {
    theme_cssVars: ThemeState["theme_cssVars"];
    theme_naiveOverrides: GlobalTheme;
  };
  light: {
    theme_cssVars: ThemeState["theme_cssVars"];
    theme_naiveOverrides: GlobalTheme;
  };
};

export const themeMap: ThemeMap = {
  dark: {
    theme_cssVars: {
      // 背景颜色
      "--bg-color": "rgba(32, 32, 32, 0.9)",
      // 用于和背景颜色相衬
      "--subtle-color": "rgba(24, 24, 28, 1)",
      // 文本颜色
      "--text-color": "rgba(221, 223, 228, 1)",
      // 边框颜色
      "--border-color": "rgba(43, 48, 61, 1)",
      // 遮罩颜色
      "--mask-color": "rgba(0, 0, 0, 0.3)",
      // 主题颜色
      "--special-color": "rgba(99, 139, 210, 1)",
      // 阴影颜色的RGB值
      "--shadow-color-rgb": "0, 0, 0",
      // 浅阴影颜色
      "--shadow-shallow": "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
      // 主要阴影颜色
      "--shadow-base": "0 2px 4px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.24)"

      // !! 下面为暂时没有用到的
      // 特殊颜色的RGB值
      // "--special-color-rgb": "99, 139, 210"
      // 柔和的文本颜色
      // "--text-soft-color": "rgba(185, 187, 193, 1)",

      // 强烈的文本颜色
      // "--text-strong-color": "rgba(187, 187, 187, 1)",

      // 阴影颜色
      // "--shadow-color": "rgba(0, 0, 0, 1)",

      // 输入框颜色
      // "--input-color": "rgba(28, 28, 28, 1)",

      // 轮廓线颜色
      // "--outline-color": "rgba(129, 159, 219, 1)",

      // 标记颜色
      // "--mark-color": "rgba(99, 139, 210, 0.08)",

      // 特殊背景颜色
      // "--special-bg-color": "rgba(69, 99, 152, 1)",

      // 特殊文本颜色
      // "--special-text-color": "rgba(221, 223, 228, 1)",

      // 特殊阴影颜色
      // "--special-shadow-color": "rgba(26, 30, 41, 1)",

      // 特殊标记颜色
      // "--special-mark-color": "rgba(221, 223, 228, 0.08)",

      // 浅色
      // "--light-color": "rgba(201, 212, 239, 1)",

      // 深色
      // "--dark-color": "rgba(46, 53, 69, 1)",

      // 文本颜色的RGB值
      // "--text-color-rgb": "221, 223, 228",

      // 页面背景颜色的RGB值
      // "--bg-color-rgb": "32, 32, 32",

      // 柔和的颜色的RGB值
      // "--subtle-color-rgb": "34, 36, 41",

      // 特殊文本颜色的RGB值
      // "--special-text-color-rgb": "221, 223, 228",

      // 特殊背景颜色的RGB值
      // "--special-bg-color-rgb": "69, 99, 152",

      // 特殊阴影颜色的RGB值
      // "--special-shadow-color-rgb": "26, 30, 41",

      // 轮廓线颜色的RGB值
      // "--outline-color-rgb": "129, 159, 219",

      // 深色的RGB值
      // "--dark-color-rgb": "46, 53, 69",

      // 浅色的RGB值
      // "--light-color-rgb": "201, 212, 239"
    },
    theme_naiveOverrides: {
      ...darkTheme,
      common: {
        ...darkTheme.common,
        // primaryColor: "rgba(80, 120, 200, 1)",
        primaryColor: "#111111",
        // primaryColorHover: "rgba(80, 120, 200, 1)"
        primaryColorHover: "#111111"
      }
    }
  },
  light: {
    theme_cssVars: {
      "--bg-color": "rgba(255, 255, 255, 0.9)",
      "--subtle-color": "rgba(246, 248, 249, 1)",
      "--text-color": "rgba(40, 48, 66, 1)",
      "--border-color": "rgba(225, 231, 247, 1)",
      "--mask-color": "rgba(0, 0, 0, 0.3)",
      "--special-color": "rgba(74, 127, 208, 1)",
      "--shadow-color-rgb": "179, 191, 222",
      "--shadow-shallow": "0 2px 12px 0 rgba(179, 191, 222, 0.1)",
      "--shadow-base": "0 2px 4px rgba(179, 191, 222, 0.3), 0 0 6px rgba(179, 191, 222, 0.24)"

      // !! 下面为暂时没有用到的
      // "--special-text-color": "rgba(255, 255, 255, 1)",
      // "--text-soft-color": "rgba(69, 74, 87, 1)",
      // "--text-strong-color": "rgba(74, 74, 74, 1)",
      // "--shadow-color": "rgba(179, 191, 222, 1)",
      // "--input-color": "rgba(255, 255, 255, 1)",
      // "--outline-color": "rgba(175, 191, 231, 1)",
      // "--mark-color": "rgba(74, 127, 208, 0.08)",
      // "--special-bg-color": "rgba(77, 131, 214, 1)",
      // "--special-shadow-color": "rgba(78, 89, 114, 1)",
      // "--special-mark-color": "rgba(255, 255, 255, 0.08)",
      // "--light-color": "rgba(240, 243, 252, 1)",
      // "--dark-color": "rgba(62, 71, 91, 1)",
      // "--text-color-rgb": "40, 48, 66",
      // "--bg-color-rgb": "255, 255, 255",
      // "--subtle-color-rgb": "248, 249, 253",
      // "--special-color-rgb": "74, 127, 208",
      // "--special-text-color-rgb": "255, 255, 255",
      // "--special-bg-color-rgb": "77, 131, 214",
      // "--shadow-color-rgb": "179, 191, 222",
      // "--special-shadow-color-rgb": "78, 89, 114",
      // "--outline-color-rgb": "175, 191, 231",
      // "--dark-color-rgb": "62, 71, 91",
      // "--light-color-rgb": "240, 243, 252"
    },
    theme_naiveOverrides: {
      ...lightTheme,
      common: {
        ...lightTheme.common,
        primaryColor: "rgba(80, 120, 200, 1)",
        primaryColorHover: "rgba(80, 120, 200, 1)"
      }
    }
  }
};

// eslint-disable-next-line arrow-body-style
export const useThemeConfig = (mode: keyof ThemeMap): ThemeMap[keyof ThemeMap] => {
  return themeMap[mode];
};
