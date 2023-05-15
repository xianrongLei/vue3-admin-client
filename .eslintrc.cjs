module.exports = {
  // 环境
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 插件从右到左覆盖处理
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "eslint-config-airbnb-base",
    "eslint-config-prettier"
  ],
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
    // 禁止未使用的变量，级别为警告
    "no-unused-vars": 1,

    // 禁用console语句，级别为警告
    "no-console": 1,

    // 允许导入外部的依赖，级别为关闭
    "import/no-extraneous-dependencies": 0,

    // 不要强制使用默认导出，级别为关闭
    "import/prefer-default-export": 0,

    // 允许导入未解析的模块，级别为关闭
    "import/no-unresolved": 0,

    // 允许参数重新分配，级别为关闭
    "no-param-reassign": 0,

    // 允许多个单词的组件名，级别为关闭
    "vue/multi-word-component-names": 0,

    // 允许属性使用连字符，级别为关闭
    "vue/attribute-hyphenation": 0,

    // 允许v-on事件使用连字符，级别为关闭
    "vue/v-on-event-hyphenation": 0,

    // 允许导入时使用文件扩展名，级别为关闭
    "import/extensions": 0,

    // 允许使用绝对路径导入，级别为关闭
    "import/no-absolute-path": 0,

    // 关闭驼峰命名检查
    camelcase: "off"
  }
};
