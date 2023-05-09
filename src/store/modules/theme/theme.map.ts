import { ThemeState } from "./theme.types";

export const themeMap: any = {
  light: {
    theme_cssVars: {
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
    }
  },
  dark: {
    theme_cssVars: {
      "--bg-color": "rgba(32, 32, 32, 1)",
      "--text-color": "rgba(221, 223, 228, 1)",
      "--text-soft-color": "rgba(185, 187, 193, 1)",
      "--text-strong-color": "rgba(187, 187, 187, 1)",
      "--subtle-color": "rgba(34, 36, 41, 1)",
      "--border-color": "rgba(43, 48, 61, 1)",
      "--shadow-color": "rgba(0, 0, 0, 1)",
      "--input-color": "rgba(28, 28, 28, 1)",
      "--outline-color": "rgba(129, 159, 219, 1)",
      "--mark-color": "rgba(99, 139, 210, 0.08)",
      "--special-color": "rgba(99, 139, 210, 1)",
      "--special-bg-color": "rgba(69, 99, 152, 1)",
      "--special-text-color": "rgba(221, 223, 228, 1)",
      "--special-shadow-color": "rgba(26, 30, 41, 1)",
      "--special-mark-color": "rgba(221, 223, 228, 0.08)",
      "--light-color": "rgba(201, 212, 239, 1)",
      "--dark-color": "rgba(46, 53, 69, 1)",
      "--text-color-rgb": "221, 223, 228",
      "--bg-color-rgb": "32, 32, 32",
      "--subtle-color-rgb": "34, 36, 41",
      "--special-color-rgb": "99, 139, 210",
      "--special-text-color-rgb": "221, 223, 228",
      "--special-bg-color-rgb": "69, 99, 152",
      "--shadow-color-rgb": "0, 0, 0",
      "--special-shadow-color-rgb": "26, 30, 41",
      "--outline-color-rgb": "129, 159, 219",
      "--dark-color-rgb": "46, 53, 69",
      "--light-color-rgb": "201, 212, 239"
    },
    theme_naiveOverrides: {
      common: {
        primaryColor: "rgba(80, 120, 200, 1)",
        primaryColorHover: "rgba(80, 120, 200, 1)"
      }
    }
  }
};
type Result = {
  theme_cssVars: ThemeState["theme_cssVars"];
  theme_naiveOverrides: ThemeState["theme_naiveOverrides"];
};
// eslint-disable-next-line arrow-body-style
export const getThemeConfig = (mode: ThemeState["theme_mode"]): Result => {
  return themeMap[mode];
};
