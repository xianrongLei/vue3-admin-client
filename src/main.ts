import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import { registerStore } from "@/store"
import router from "./router/index"

const app = createApp(App)
// 注册 Pinia
app.use(createPinia()) // 挂载
registerStore() // 注册
// 注册路由
app.use(router)

app.mount("#app")
