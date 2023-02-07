import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { registerStore } from "@/store"
import router from "./router/index"
import i18n from "@/i18n/index"
// application style
import "@/style/index.css"
// application example
const app = createApp(App)
// data manager
app.use(createPinia())
registerStore()
// router
app.use(router)
// 语言注册
app.use(i18n)
// render application
app.mount("#app")
