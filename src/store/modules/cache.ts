import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export default defineStore("cache", {
  state: () => ({
    token: useStorage("token", "")
  }),
  actions: {}
});
