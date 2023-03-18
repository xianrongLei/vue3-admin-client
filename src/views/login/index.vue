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
          <div
            class="verify"
            @click="initialize"
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

<script lang="ts">
import { ref, defineComponent, ComponentOptions } from "vue"
import { Person, KeySharp, DiceSharp } from "@vicons/ionicons5"
import { useI18n } from "vue-i18n"
import { useMessage } from "naive-ui"
import { useCaptchaApi, useSigninApi } from "./login.api"

export default defineComponent({
  components: {
    Person,
    KeySharp,
    DiceSharp
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.isExceed = false
      const [error, result] = await useCaptchaApi({
        type: 1,
        color: true
      })
      if (error) throw new Error(error)

      this.verifySrc = result.data
      this.loginForm.uniCode = result.uniCode

      setTimeout(() => {
        this.isExceed = true
      }, result.time * 1000)
    },
    async login() {
      let isPass: boolean
      try {
        await (this.$refs.loginFormRef as ComponentOptions).validate()
        isPass = true
      } catch (error) {
        isPass = false
      }
      if (isPass) {
        const [err, data]: any[] = await useSigninApi(this.loginForm)
        if (err) {
          this.initialize()
          this.message.error(err.response.data.message)
        } else {
          this.message.success("登录成功")
          console.log(data)
        }
      }
    }
  },
  setup() {
    const { t }: any = useI18n()
    return {
      message: useMessage(),
      isExceed: ref(false),
      verifySrc: ref(""),
      loginForm: ref({
        username: "admin",
        password: "admin123",
        uniCode: "",
        answer: ""
      }),
      loginRules: {
        username: {
          required: true,
          message: t("login.login_username_p"),
          trigger: "blur"
        },
        password: {
          required: true,
          message: t("login.login_password_p"),
          trigger: "blur"
        },
        answer: {
          required: true,
          message: t("login.login_captcha_p"),
          trigger: "blur"
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  background-color: var(--bg-color);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
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
  :deep(.verify) {
    width: 150px;
    border: 1px solid var(--border-color);
    height: 40px;
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    > :nth-child(1) > svg {
      pointer-events: none;
      width: 100% !important;
      height: 40px !important;
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
}
.login-title {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  font-size: 24px;
  color: #444;
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
    flex: 0 1 auto;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
