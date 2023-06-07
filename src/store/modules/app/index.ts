import { defineStore } from "pinia";
import * as baseIcons from "@vicons/ionicons5";

const iconData: Record<string, unknown> = {};
const extraIcons = import.meta.globEager("@/assets/icons/*.svg");

/**
 * 1.拿到所有icon的name
 *
 */
Object.keys(extraIcons).forEach((iconName) => {
  const finlayKey = `custom_${iconName.match(/[^/]+(?=\.svg$)/)?.[0]}`;

  console.log(iconData.finlayKey, 22);
  console.log(extraIcons[iconName], "@");
});

// export const  test = extraIcons

console.log(extraIcons);

export interface AppState {}

export const useUserStore = defineStore("app", {
  state: (): AppState => ({}),
  cache: {},
  actions: {
    useGetIcon(iconName: keyof typeof baseIcons) {
      console.log(baseIcons[iconName]);
      console.log(iconName);
    }
  }
});
export default useUserStore;
