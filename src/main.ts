import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { registerStore } from "@/store"
import router from "./router/index"

const app = createApp(App)
// 注册 Pinia
app.use(createPinia())
registerStore()
// 注册路由
app.use(router)

app.mount("#app")
