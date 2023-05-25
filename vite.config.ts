import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true // 开启$ref
    }),
    eslintPlugin(),
    Unocss({
      presets: [presetAttributify({}), presetUno()],
      rules: [
        // [/^m-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "m": `${d}px` })],
        // [/^p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "line-height": `${d}` })]
      ]
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
