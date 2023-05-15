import { defineStore } from "pinia";
import { UseStateOperatorInput } from "../../store.types";

export interface AppState {
  app_theme?: "dark" | "light";
  app_themeEditor?: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    app_theme: "dark",
    app_themeEditor: false
  }),
  actions: {
    useAppStateOperator<V>({ key, value }: UseStateOperatorInput<AppState, V>): void {
      (this as any)[key] = value;
    }
  },
  cache: {
    app_theme: {
      type: "local",
      default: "dark"
    },
    app_themeEditor: {
      type: "local",
      default: false
    }
  }
});
export default useAppStore;
