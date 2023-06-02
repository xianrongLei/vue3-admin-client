import { Pinia, createPinia } from "pinia";
import { cacheManager } from "./plugin/plugin.cache";

export const pinia: Pinia = createPinia();
const files: Record<string, any> = import.meta.globEager("./modules/*/index.ts");

pinia.use(cacheManager);

export const mountPinia = (vueUse: Function) => {
  // 注册
  vueUse(pinia);
  Object.keys(files).forEach((fileName) => {
    files[fileName].default();
  });
};
