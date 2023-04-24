import { Pinia, createPinia } from "pinia";
import { cache } from "./plugin/cache";

export const pinia: Pinia = createPinia();
const files: Record<string, any> = import.meta.globEager("./modules/*.ts");

pinia.use(cache);

export const registerStore = (vueUse: Function) => {
  // 注册
  vueUse(pinia);
  Object.keys(files).forEach((fileName) => {
    files[fileName].default();
  });
};
