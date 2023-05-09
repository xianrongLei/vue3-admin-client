import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import { mountPinia } from "@/store";
import { mountRouter } from "./router/index";
import { mountI18n } from "@/i18n/index";
import { mountNaive } from "./naive/index";
import { apolloClient } from "@/apollo";
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import "@/style/index";
import { mountConfig } from "./config/index";

// apollo
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App)
});
// mount app config
mountConfig(window);
// naiveUI
mountNaive(app.use);
// data manager
mountPinia(app.use);
// router
mountRouter(app.use);
// i18n
mountI18n(app.use);
// render application
app.mount("#app");
