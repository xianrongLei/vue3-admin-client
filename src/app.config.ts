export interface AppConfig {
  axios: {
    baseURL: string
    timeout: number
    headers: {
      "Content-Type": string
    }
  }
  appTitle: string
}

export const appConfig: AppConfig = {
  axios: {
    baseURL: "http://192.168.1.10/v1",
    // baseURL: "http://192.168.0.103/v1",
    // baseURL: "http://10.15.15.168/v1",
    timeout: 6000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  },
  appTitle: "MAKU"
}
