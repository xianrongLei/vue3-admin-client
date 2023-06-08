import { defineStore } from "pinia";
// import { ComponentOptions } from "vue";

// const Components = import.meta.glob("@/components/**/index.vue");
// export const mountCommonComponents = (vueComponent: (name: string, componentOptions: ComponentOptions) => void) => {
//   Object.keys(Components).forEach((name) => {
//     vueComponent("", Components[name]);
//   });
// };

// console.log(Components);

export interface AppState {}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({}),
  cache: {}
});
export default useAppStore;
