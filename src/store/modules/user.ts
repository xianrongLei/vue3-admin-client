import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): Record<string, any> => ({
    userInfo: {}
  }),
  actions: {}
});

export default useUserStore;
