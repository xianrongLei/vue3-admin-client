<script lang="ts" setup>
import { useMutation } from "@vue/apollo-composable";
import { defineExpose, onMounted, ref } from "vue";
import { useMessage } from "naive-ui";
import { awaitTo } from "@/utils/utils.awaitTo";
import { captchaGql } from "./login.gql";

const isExceed = ref(false);
const verifySrc = ref("");
const { mutate } = useMutation(captchaGql, () => ({
  variables: {
    createCaptchaInput: {
      type: 1,
      color: true
    }
  }
}));
const emits = defineEmits(["captcha"]);
const message = useMessage();
const getCaptcha = async () => {
  isExceed.value = false;
  const [error, data] = await awaitTo(mutate(), { message: "获取验证码失败" });
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
  getCaptcha();
});
defineExpose({
  getCaptcha
});
</script>

<template>
  <div
    class="verify"
    @click="getCaptcha"
  >
    <div
      v-show="!isExceed && verifySrc"
      v-html="verifySrc"
    ></div>
    <div
      class="tip"
      v-show="!verifySrc"
    >
      <div class="content">获取验证码失败</div>
    </div>
    <div
      class="tip"
      v-show="isExceed"
    >
      <div class="content">验证码已过期<br />点击刷新</div>
    </div>
  </div>
</template>

<style lang="scss">
.verify {
  width: 150px;
  border: 1px solid var(--border-color);
  height: 40px;
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  > :nth-child(1) {
    pointer-events: none;
    width: 100% !important;
    height: 40px !important;
    > svg {
      width: 100% !important;
      height: 40px !important;
    }
  }
  .tip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    background-color: var(--mark-color);
    color: var(--text-strong-color);
    .content {
      transform: scale(0.8);
    }
  }
}
</style>
