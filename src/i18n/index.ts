import { createI18n } from "vue-i18n" // 引入vue-i18n组件
import zh from "./zh/index"
import en from "./en/index"

const langStorage: any = { lang: "ZH" }
const lang = "ZH"
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
]

const i18n = createI18n({
  locale: langStorage?.lang || lang,
  fallbackLocale: langStorage?.lang || lang,
  messages: {
    ZH: zh,
    EN: en
  }
})

export default i18n
