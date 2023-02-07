module.exports = {
  // 环境
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 插件从右到左覆盖处理
  extends: ["plugin:vue/vue3-strongly-recommended", "eslint-config-airbnb-base", "eslint-config-prettier"],
  // vue解析器
  parser: "vue-eslint-parser",
  // 解析器配置
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      tsx: true,
      jsx: true
    }
  },
  // 全局自定义宏
  globals: {
    $ref: "readonly"
  },
  // 插件
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "no-unused-vars": 1,
    "no-console": 1,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "no-param-reassign": 0,
    "vue/multi-word-component-names": 0,
    "vue/attribute-hyphenation": 0,
    "vue/v-on-event-hyphenation": 0,
    "import/extensions": 0,
    "import/no-absolute-path": 0
  }
}
