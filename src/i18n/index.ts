import { createI18n } from "vue-i18n"; // 引入vue-i18n组件
import zh from "./zh/index";
import en from "./en/index";

interface LangStorage {
  lang: "ZH";
}
const langStorage: LangStorage = {
  lang: "ZH"
};
// 语言数组
export const langList = [
  {
    label: "中文",
    key: "ZH"
  },
  {
    label: "English",
    key: "EN"
  }
];

const i18n = createI18n({
  locale: langStorage.lang,
  fallbackLocale: langStorage.lang,
  legacy: false,
  messages: {
    ZH: zh,
    EN: en
  }
});

export const mountI18n = (vueUse: Function): void => {
  vueUse(i18n);
};
