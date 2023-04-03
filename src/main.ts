import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { registerStore } from "@/store";
import router from "./router/index";
import i18n from "@/i18n/index";
import naive from "./naiveUI/index";
// Naive UI 通用字体
import "vfonts/Lato.css";
// Naive UI 等宽字体
import "vfonts/FiraCode.css";
// application style
import "@/style/index";
// application example
import { appConfig } from "./app.config";

const win: Window = window;
win.appConfig = appConfig;
win.document.title = appConfig.appTitle;

const app = createApp(App);
// naiveUI
app.use(naive);
// data manager
app.use(createPinia());
registerStore();
// router
app.use(router);
// 语言注册
app.use(i18n);
// render application
app.mount("#app");
