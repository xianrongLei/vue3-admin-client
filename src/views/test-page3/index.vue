<script lang="ts" setup>
import { ref, Ref } from "vue";
// import CommonResizeBox from "@/components/CommonResizeBox/index.vue";

const mode: Ref = ref(0);
const checkMode = () => {
  mode.value += 1;
  if (mode.value === 3) {
    mode.value = 0;
  }
};
</script>

<template>
  <div
    class="container"
    ref="refContainer"
  >
    <!-- <CommonResizeBox
      :mode="mode"
      :height="1080"
      :width="1920"
    >
      <div
        class="tt"
        @click="checkMode"
      >
        <div class="xxx">sadf</div>
      </div>
    </CommonResizeBox> -->
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 20px solid pink;
  height: 500px;

  .tt {
    width: 100%;
    height: 100%;
    border: 2px solid #000;
    position: relative;

    .xxx {
      top: 0;
      right: 0;
      background-color: pink;
      width: 80%;
      height: 80%;
      transition: all 0.2s;
      transform: scale(0.8, 0.8);
      transform-origin: left bottom;

      &:hover {
        width: 100%;
        height: 100%;
        transform: scale(1);
      }
    }
  }
}
</style>
