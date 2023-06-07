import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import Unocss from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true // 开启$ref
    }),
    eslintPlugin(),
    Unocss({ configFile: "./uno.config.ts" }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    },
    extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
});
