import { createApp, h } from "vue";
import App from "./main.vue";
import { mountPinia } from "@/store";
import { mountRouter } from "./router/index";
import { mountI18n } from "@/i18n/index";
import { mountNaive } from "./naive/index";
import { mountApollo } from "@/apollo";
import { mountConfig } from "./config/index";
// App base style
import "@/style/index";

// apollo
const app = createApp({
  setup() {
    // mount app config
    mountConfig();
    // mount apollo
    mountApollo();
  },
  render: () => h(App)
});
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
