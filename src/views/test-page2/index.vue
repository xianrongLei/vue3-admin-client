<script lang="ts" setup>
import type { Ref } from "vue";
import { ref } from "vue";
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
        第三方的
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
  }
}
</style>
