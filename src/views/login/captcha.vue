<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useMessage } from "naive-ui";
import { awaitTo } from "@/utils/utils.awaitTo";
import { useCaptchaApi } from "./login.gql";
/**
 * 数据
 */
const [isExceed, verifySrc] = [ref(false), ref(false)];
/**
 * UI组件
 */
const message = useMessage();
/**
 * api
 */
const CaptchaApi = useCaptchaApi({
  createCaptchaInput: {
    type: 1,
    color: true
  }
});
const emits = defineEmits(["captcha"]);
/**
 * 获取验证码
 */
const useCaptcha = async () => {
  isExceed.value = false;
  const [error, data] = await awaitTo(CaptchaApi.mutate(), { message: "获取验证码失败" });
  if (error) {
    message.error(error.message);
    throw new Error(error.message);
  }
  const { captcha } = data?.data || {};
  verifySrc.value = captcha.svg;
  setTimeout(() => {
    isExceed.value = true;
  }, (captcha.time as number) * 1000);
  emits("captcha", captcha.uniCode);
};
onMounted(() => {
  useCaptcha();
});
defineExpose({
  useCaptcha
});
</script>

<template>
  <div
    class="w-150px h-40px m-l-10px flex justify-center items-center relative"
    style="border: 1px solid var(--border-color)"
    @click="useCaptcha"
  >
    <div
      class="svg-container"
      v-show="!isExceed && verifySrc"
      v-html="verifySrc"
    ></div>
    <div
      class="absolute top-0 left-0 w-full h-full text-12px line-height-[15px] flex justify-center items-center text-center"
      v-show="!verifySrc"
    >
      <div class="content">获取验证码失败</div>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full text-12px line-height-[15px] flex justify-center items-center text-center"
      v-show="isExceed"
    >
      <div style="transform: scale(0.8)">验证码已过期<br />点击刷新</div>
    </div>
  </div>
</template>

<style lang="scss">
.verify {
  .svg-container {
    pointer-events: none;
    width: 100% !important;
    height: 40px !important;
    svg {
      width: 100% !important;
      height: 40px !important;
    }
  }
}
</style>
