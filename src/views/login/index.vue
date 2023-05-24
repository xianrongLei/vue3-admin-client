<template>
  <div class="login-container">
    <div class="login-intro">
      <h1>{{ $t("global.title") }}</h1>
      <div class="desc">
        {{ $t("login.login_description") }}
      </div>
      <div class="login-bg"><img src="@/assets/login.png" /></div>
    </div>
    <div class="login-form">
      <n-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        @keyup.enter="login"
        size="large"
        :style="{
          maxWidth: '640px'
        }"
      >
        <div class="login-title">{{ $t("login.title") }}</div>
        <n-form-item path="username">
          <!-- <n-button attr-type="button"> 验证 </n-button> -->
          <n-input
            v-model:value="loginForm.username"
            :placeholder="$t('login.login_username_p')"
            clearable
          >
            <template #prefix>
              <n-icon>
                <Person />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item
          path="password"
          label-style="margin:40px 0;"
        >
          <n-input
            v-model:value="loginForm.password"
            type="password"
            :placeholder="$t('login.login_password_p')"
            clearable
          >
            <template #prefix>
              <n-icon>
                <KeySharp />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item
          path="answer"
          label-style="margin:40px 0;"
        >
          <n-input
            v-model:value="loginForm.answer"
            :placeholder="$t('login.login_captcha_p')"
            clearable
          >
            <template #prefix>
              <n-icon>
                <DiceSharp />
              </n-icon>
            </template>
          </n-input>
          <Captcha
            ref="captchaRef"
            @captcha="(uniCode) => (loginForm.uniCode = uniCode)"
          />
        </n-form-item>
        <n-form-item>
          <n-button
            @click="login"
            style="width: 100%"
            strong
            secondary
            type="primary"
          >
            {{ $t("login.title") }}
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Person, KeySharp, DiceSharp } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import { useLoadingBar, useMessage } from "naive-ui";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { signinGql } from "./login.gql";
import Captcha from "./captcha.vue";
import { awaitTo } from "@/utils/utils.awaitTo";
import { useUserStore } from "@/store/modules/user";

const { t } = useI18n();
const loginForm = ref({
  username: "admin",
  password: "admin",
  uniCode: "",
  answer: ""
});
const loginRules = ref({
  username: {
    required: true,
    trigger: "blur",
    renderMessage: () => t("login.login_username_p")
  },
  password: {
    required: true,
    trigger: "blur",
    renderMessage: () => t("login.login_password_p")
  },
  answer: {
    required: true,
    trigger: "blur",
    renderMessage: () => t("login.login_captcha_p")
  }
});
const { mutate: getSignin } = useMutation(signinGql, () => ({
  variables: {
    createAuthInput: {
      user: {
        username: loginForm.value.username,
        password: loginForm.value.password
      },
      uniCode: loginForm.value.uniCode,
      answer: loginForm.value.answer
    }
  }
}));
const loadingBar = useLoadingBar();
const $router = useRouter();
const message = useMessage();
const loginFormRef = ref<(HTMLElement & { validate: () => Promise<void> }) | null>(null);
const captchaRef = ref<(HTMLElement & { getCaptcha: () => string }) | null>(null);
const { useUserStateOperator } = useUserStore();
async function login() {
  loadingBar.start();
  const [formErr] = await awaitTo(loginFormRef.value?.validate());
  if (formErr) {
    loadingBar.finish();
    return;
  }
  const [error, data] = await awaitTo(getSignin());
  if (error) {
    loginForm.value.uniCode = captchaRef.value?.getCaptcha() || "";
    message.error(error.message);
    loadingBar.error();
    return;
  }
  const userInfo = data?.data.signin;
  useUserStateOperator<"user_token">("user_token", {
    userId: userInfo.user.id,
    access_token: userInfo.access_token,
    refresh_token: userInfo.refresh_token
  });
  $router.push("/");
  loadingBar.finish();
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: var(--bg-color);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
.login-intro {
  display: flex;
  flex-direction: column;
  width: 520px;
  flex: 0 1 auto;
}
.login-intro h1 {
  color: var(--special-color);
}
.login-intro .desc {
  color: var(--text-color);
  line-height: 32px;
  padding: 15px 0;
}
.login-bg img {
  width: 520px;
}
.login-form {
  background-color: var(--bg-color);
  flex: 0 1 auto;
  padding: 40px;
  border-radius: 6px;
  box-shadow: 1px 1px 8px var(--shadow-color);
  box-sizing: border-box;
  width: 440px;
  cursor: pointer;
}
.login-title {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  font-size: 24px;
  color: var(--text-color);
  letter-spacing: 4px;
}
.login-captcha {
  :deep(.n-input) {
    width: 200px;
  }
}
@media only screen and (max-width: 992px) {
  .login-intro {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .login-intro {
    display: none;
  }
  .login-form {
    background-color: transparent;
    flex: 0 1 auto;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
