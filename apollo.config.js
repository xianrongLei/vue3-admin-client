const { appConfig } = require("./src/app.config");

module.exports = {
  client: {
    service: {
      name: appConfig.GraphQL.name,
      // GraphQL API 的 URL
      url: appConfig.GraphQL.url
    },
    // 通过扩展名选择需要处理的文件
    includes: ["src/**/*.vue", "src/**/*.js"]
  }
};
