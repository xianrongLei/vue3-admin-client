<template>
  <router-view></router-view>
</template>
<style>
/* 设置最外层容器默认样式 */
html,
body,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  /*统一最外层容器背景颜色*/
  background-color: #fff;
}

/* 设置所有元素的默认样式 */
* {
  box-sizing: border-box;
  /*ios优化移动端滚动事件*/
  -webkit-overflow-scrolling: touch;
  /*取消部分浏览器点击有阴影*/
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  /*使字体渲染更顺滑*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* 设置所有元素隐藏滚动条 */
* ::-webkit-scrollbar {
  width: 10px;
  height: 6px;
  display: none;
}
</style>
