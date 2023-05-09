import { Pinia, createPinia } from "pinia";
import { cache } from "./plugin/plugin.cache";

export const pinia: Pinia = createPinia();
const files: Record<string, any> = import.meta.globEager(
  "./modules/*/index.ts"
);

pinia.use(cache);

export const mountPinia = (vueUse: Function) => {
  // 注册
  vueUse(pinia);
  Object.keys(files).forEach((fileName) => {
    files[fileName].default();
  });
};
