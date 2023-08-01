<script lang="ts" setup>
import type { Ref } from "vue";
import { ref } from "vue";

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
    <div
      class="tt"
      @click="checkMode"
    >
      第三方的
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 500px;

  .tt {
    width: 100%;
    height: 100%;
  }
}
</style>
