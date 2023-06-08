<script setup>
import { ref } from "vue";

const whichClass = ref("draggable");

const active = () => {
  whichClass.value = "draggable active";
};
const paused = () => {
  whichClass.value = "draggable paused";
};
</script>

<template>
  <div
    :class="whichClass"
    @mouseover="paused"
    @mouseout="active"
  >
    sdfsdf
  </div>
</template>

<style scoped>
@keyframes test {
  0% {
    width: 0px;
  }
  50% {
    width: 400px;
  }
  100% {
    width: 0px;
  }
}
.draggable {
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: 320px;
  height: 240px;
  overflow: hidden;
  margin: 30px auto;
  position: relative;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  user-select: none;
  border-radius: 8px;
  animation: test 2s infinite;
}
.active {
  animation-play-state: running;
}
.paused {
  animation-play-state: paused;
}
</style>
