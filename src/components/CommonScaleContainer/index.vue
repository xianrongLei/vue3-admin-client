<template>
  <div
    ref="parentNode"
    class="resizeBox-warp"
  >
    <div
      ref="target"
      :class="[
        mode == 2 ? 'resizeBox-container-default' : 'resizeBox-container-scale',
        alignType == 'middle' ? 'resizeBox-container-align-middle' : 'resizeBox-container-align-top'
      ]"
      class="resizeBox-container"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch, onUnmounted, Ref, withDefaults, defineExpose } from "vue";
import { getResize, modeType, GetResize } from "./index";

const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;
    mode?: modeType;
    alignType?: string;
  }>(),
  {
    width: 1920,
    height: 1080,
    mode: 0,
    alignType: "top"
  }
);

// 缩放函数 返回参数
let resizeParams: GetResize;
// 父节点
const parentNode: Ref = ref(null);
// 主容器
const target: Ref = ref(null);
// 初始化函数
const init = (): void => {
  if (props.mode === 2) return;
  const ResizeOption = {
    parentNode: parentNode.value.parentNode,
    target: target.value,
    width: props.width,
    height: props.height,
    mode: props.mode,
    alignType: props.alignType
  };
  resizeParams = getResize(ResizeOption);
  switch (props.mode) {
    case 0:
      resizeParams.stretch();
      break;
    case 1:
      resizeParams.ratio();
      break;
    default:
      resizeParams.stretch();
      break;
  }
  resizeParams.parentResize();
};
// 销毁函数
const dispose = (): void => {
  resizeParams?.unWindowResize();
};

// 暴露参数
defineExpose({
  init,
  dispose
});

watch(
  () => props.mode,
  async () => {
    await nextTick(() => {});
    dispose();
    init();
  },
  {
    immediate: true
  }
);
// hook
onUnmounted(() => {
  resizeParams.unWindowResize();
});
</script>

<style lang="scss" scoped>
.resizeBox-warp {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;

  .resizeBox-container {
    box-sizing: border-box;
  }

  .resizeBox-container-scale {
    position: absolute;
    transform-origin: left top;
    transition: transform 0.2s ease-in-out;
  }

  .resizeBox-container-default {
    transform: none !important;
    top: 0 !important;
    left: 0 !important;
  }

  .resizeBox-container-align-top {
    top: 0;
    left: 50%;
  }

  .resizeBox-container-align-middle {
    top: 50%;
    left: 50%;
  }
}
</style>
