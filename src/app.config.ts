export interface AppConfig {
  appTitle: string;
  axios: {
    baseURL: string;
    timeout: number;
    headers: {
      "Content-Type": string;
    };
  };
  GraphQL: {
    name: string;
    url: string;
  };
}
const appTitle: string = "MAKU";

export const appConfig: AppConfig = {
  appTitle,
  axios: {
    baseURL: "http://192.168.1.13/v1",
    // baseURL: "http://10.15.15.137/v1",
    timeout: 6000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  },
  GraphQL: {
    name: appTitle,
    url: "http://192.168.1.13/graphql"
  }
};
