import { defineStore } from "pinia";

export interface AppState {
  app_theme?: "dark" | "light";
  app_themeEditor?: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({}),
  cache: {}
});
export default useAppStore;
