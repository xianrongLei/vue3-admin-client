<script lang="ts" setup></script>

<template>
  <div class="carousel-container">
    <ul class="carousel-list">
      <li>
        <img
          src="img1.jpg"
          alt="Image 1"
        />
      </li>
      <li>
        <img
          src="img2.jpg"
          alt="Image 2"
        />
      </li>
      <li>
        <img
          src="img3.jpg"
          alt="Image 3"
        />
      </li>
      <li>
        <img
          src="img4.jpg"
          alt="Image 4"
        />
      </li>
      <li>
        <img
          src="img5.jpg"
          alt="Image 5"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.carousel-container {
  width: 500px;
  height: 300px;

  position: relative; /* 设置为相对定位，子元素才能使用绝对定位 */
  overflow: hidden; /* 隐藏超出容器范围的内容 */
}

.carousel-list {
  list-style: none;
  margin: 0;
  padding: 0;

  width: 5000px; /* 列表宽度为所有图片宽度的总和 */
  position: absolute; /* 设置为绝对定位，方便使用 top 和 left 属性 */
  top: 0;
  left: 0;

  animation: carousel 10s infinite linear; /* 播放动画，持续时间为20s，无限循环 */
}

.carousel-list > :nth-child(2n) {
  background-color: blueviolet;
}
.carousel-list li {
  float: left;
  width: 500px; /* 图片的宽度 */
  height: 300px; /* 图片的高度 */
  background-color: pink;
}

@keyframes carousel {
  0% {
    left: 0;
  } /* 初始位置为0 */
  25% {
    left: -500px;
  } /* 滚动到第二张图片的位置 */
  50% {
    left: -1000px;
  } /* 滚动到第三张图片的位置 */
  75% {
    left: -1500px;
  } /* 滚动到第四张图片的位置 */
  100% {
    left: -2000px;
  } /* 滚动到第五张图片的位置 */
}
</style>
