import { defineConfig } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true // 开启$ref
    }),
    eslintPlugin()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") // 路径别名
    },
    extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
})
