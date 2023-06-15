import { createApp, h } from "vue";
import App from "./App.vue";
import { mountPinia } from "@/store";
import { mountRouter } from "./router/index";
import { mountI18n } from "@/i18n/index";
import { mountNaive } from "./naive/index";
import { mountApollo } from "@/apollo";
import { mountConfig } from "./config/index";
import { mountComponents } from "@/components/index";
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
// data manager
mountPinia(app.use);
// naiveUI
mountNaive(app.use);
// router
mountRouter(app.use);
// i18n
mountI18n(app.use);
// common components
mountComponents(app.component);
// render application
app.mount("#app");
