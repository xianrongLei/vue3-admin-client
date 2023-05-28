<template>
  <div
    class="login-container flex justify-evenly items-center h-full"
    style="background-color: var(--bg-color)"
  >
    <div class="login-intro flex flex-col flex-shrink-1 flex-grow-0 flex-basis-a w-520px">
      <h1 style="color: var(--special-color)">{{ $t("global.title") }}</h1>
      <div
        class="p-y-15 line-height-[32px]"
        style="color: var(--text-color)"
      >
        {{ $t("login.login_description") }}
      </div>
      <div class="login-bg">
        <img
          class="w-520px h-400px"
          src="@/assets/login/illustration-1.jpg"
        />
      </div>
    </div>
    <div
      class="flex flex-grow-0 flex-shrink-1 flex-basis-a p-40px b-rd-6px box-border w-440px cursor-pointer"
      style="background-color: var(--bg-color); box-shadow: var(--shadow-shallow)"
    >
      <n-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        @keyup.enter="login"
        size="large"
        style="max-width: 640px"
      >
        <div
          class="login-title flex justify-center m-b-35px text-24px tracking-4px"
          style="color: var(--text-color)"
        >
          {{ $t("login.title") }}
        </div>
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
  .login-captcha {
    :deep(.n-input) {
      width: 200px;
    }
  }
  @media only screen and (max-width: 995px) {
    .login-intro {
      display: none;
    }
  }
  @media only screen and (max-width: 765px) {
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
}
</style>
