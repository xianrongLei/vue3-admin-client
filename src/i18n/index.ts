import { createI18n } from "vue-i18n"; // 引入vue-i18n组件

const files: Record<string, any> = import.meta.globEager("./languages/*/index.ts");
// 导入所以语言
const getLanguages = (): any => {
  const languages: Record<string, any> = {};
  Object.keys(files).forEach((fileName) => {
    const lang = files[fileName].default;
    const langKey = fileName.split("/")[2];
    languages[langKey] = lang;
  });
  return languages;
};

const i18n = createI18n({
  locale: "zh",
  fallbackLocale: "zh", // 没找到要切换的语言时显示的语言
  legacy: false, // 是否是旧版模式
  messages: getLanguages()
});

export const mountI18n = (vueUse: Function): void => {
  vueUse(i18n);
};

// languages
export const langList = [
  {
    label: "中文",
    key: "zh"
  },
  {
    label: "English",
    key: "en"
  }
];
