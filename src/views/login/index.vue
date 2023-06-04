<template>
  <div class="login-container flex justify-evenly items-center h-full bg-[var(--bg-color)]">
    <div class="login-intro flex flex-col flex-shrink-1 flex-grow-0 flex-basis-a w-520px">
      <h1 class="text-[var(--special-color)]">{{ $t("global.title") }}</h1>
      <div class="p-y-15 line-height-[32px] text-[var(--text-color)]">
        {{ $t("login.login_description") }}
      </div>
      <div>
        <img
          class="w-520px h-400px"
          src="@/assets/login/illustration-1.jpg"
        />
      </div>
    </div>
    <div
      class="flex flex-grow-0 flex-shrink-1 flex-basis-a p-40px b-rd-6px box-border w-440px cursor-pointer bg-[var(--bg-color)]"
      style="box-shadow: var(--shadow-base)"
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
        class="max-w-640px"
      >
        <div class="flex justify-center m-b-35px text-24px tracking-4px text-[var(--text-color)]">
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
            class="w-full"
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
import { ComponentOptions, ref } from "vue";
import { Person, KeySharp, DiceSharp } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import { useLoadingBar, useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { useSignInApi } from "./login.gql";
import Captcha from "./captcha.vue";
import { awaitTo } from "@/utils/utils.awaitTo";
import { UserState, useUserStore } from "@/store/modules/user";

/**
 * UI组件
 */
const [loadingBar, message] = [useLoadingBar(), useMessage()];
/**
 * 核心模块
 */
const [$router, { t }] = [useRouter(), useI18n()];
const userStore = useUserStore();
/**
 * 组件引用据
 */
const [loginFormRef, captchaRef] = [ref<ComponentOptions | null>(null), ref<ComponentOptions | null>(null)];
/**
 * 页面数据
 */
const [loginForm, loginRules] = [
  ref({
    username: "admin",
    password: "admin",
    uniCode: "",
    answer: ""
  }),
  ref({
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
  })
];
/**
 * api
 */
const SignInApi = useSignInApi({
  signInInput: loginForm.value
});
/**
 * 登录
 */
async function login() {
  loadingBar.start();
  // 校验表单
  const [formErr] = await awaitTo(loginFormRef.value?.validate());
  if (formErr) {
    loadingBar.finish();
    return;
  }
  // 调用接口
  type SignInResult = {
    data: {
      signIn: {
        access_token: string;
        refresh_token: string;
        user: UserState["user_userInfo"];
      };
    };
  };
  const [signInErr, data] = await awaitTo<SignInResult>(SignInApi.mutate() as Promise<SignInResult>);
  if (signInErr) {
    loginForm.value.uniCode = "";
    captchaRef.value?.useCaptcha();
    message.error(signInErr.message);
    loadingBar.error();
    return;
  }
  const { access_token, refresh_token, user } = data?.data?.signIn as SignInResult["data"]["signIn"];
  // 缓存token 获取数据
  userStore.user_token = {
    userId: user.id,
    access_token,
    refresh_token
  };
  await awaitTo(userStore.useGetUserInfo(user.id, user));
  // 跳转路由
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
