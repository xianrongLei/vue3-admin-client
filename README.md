# 安装运行
  ```
  git clone <url>
  npm i 
  npm run dev
  ```
# 未来
  - 1.调整store的文件结构， 尽量让store和view中的module对应放置
  - 2.调整view和store之间的代码分离，将api的调用注入到store中的dispatch中
  - 3.优化缓存操作的工具（localStorage,sessionStorage）
  - 4.动态路由完善
  - 5.优化布局，增加响应式布局
  - 6.完善切换主题
  - 7.完善国际化配置
  - 8.加入tailwind css
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    console.log("回来了")
  } else {
    //visibilityState === 'hidden'
    console.log("离开了")
  }
});