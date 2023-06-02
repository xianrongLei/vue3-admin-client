import { defineStore } from "pinia";

export interface LoginState {}

export const useLoginStore = defineStore("login", {
  state: (): LoginState => ({}),
  actions: {},
  cache: {}
});
export default useLoginStore;
