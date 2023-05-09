import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client/core";
import {
  provideApolloClient,
  DefaultApolloClient
} from "@vue/apollo-composable";
import { provide } from "vue";
import { appConfig } from "@/config/index";

export const mountApollo = (): void => {
  // 与 API 的 HTTP 连接
  const httpLink = createHttpLink({
    // 你需要在这里使用绝对路径
    uri: appConfig.GraphQL.url
  });

  // 缓存实现
  const cache = new InMemoryCache();

  // 创建 apollo 客户端
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache
  });
  // 允许在组件之外使用
  provideApolloClient(apolloClient);
  // provide
  provide(DefaultApolloClient, apolloClient);
};
