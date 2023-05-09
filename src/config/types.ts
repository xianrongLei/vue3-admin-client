export interface AppConfig {
  readonly appTitle: string;
  readonly axios: {
    baseURL: string;
    timeout: number;
    headers: {
      "Content-Type": string;
    };
  };
  readonly GraphQL: {
    name: string;
    url: string;
  };
}
