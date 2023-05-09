import { AppConfig } from "./types";

export const appConfig: AppConfig = {
  appTitle: "MAKU",
  axios: {
    baseURL: "http://192.168.1.13/v1",
    // baseURL: "http://10.15.15.137/v1",
    timeout: 6000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  },
  GraphQL: {
    name: "MAKU",
    url: "http://192.168.1.13/graphql"
  }
};

export const mountConfig = (
  win: Record<string, unknown> & Window & any
): void => {
  win.appConfig = appConfig;
  win.document.title = appConfig.appTitle;
};
