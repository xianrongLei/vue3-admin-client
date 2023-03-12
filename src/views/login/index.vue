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
          path="verify"
          label-style="margin:40px 0;"
        >
          <n-input
            v-model:value="loginForm.verify"
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
            v-show="verifySrc"
            v-html="verifySrc"
            class="verify"
          ></div>
          <div
            v-show="!verifySrc"
            class="verify"
          >
            <n-icon
              size="30"
              color="#888"
              style="margin-left: 10px"
            >
              <ImageIcon />
            </n-icon>
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
import { ref, defineComponent, Ref } from "vue"
import { Image, Person, KeySharp, DiceSharp } from "@vicons/ionicons5"
import { useI18n } from "vue-i18n"
import { useCaptchaApi } from "./api.login"
import { AnyObject } from "@/types/common"

export default defineComponent({
  components: {
    ImageIcon: Image,
    Person,
    KeySharp,
    DiceSharp
  },
  methods: {
    login() {
      console.log(this.loginForm)
    }
  },
  setup() {
    const { t }: any = useI18n()
    const verifySrc: Ref<string> = ref("")
    const loginForm: Ref<AnyObject> = ref({
      username: "",
      password: "",
      uniCode: "",
      verify: ""
    })
    useCaptchaApi({
      type: 1,
      color: true
    }).then(([error, result]) => {
      if (result) {
        verifySrc.value = result.data
        loginForm.value.uniCode = result.uniCode
      } else {
        throw new Error(error)
      }
    })

    return {
      verifySrc,
      loginForm,
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
        verify: {
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
  :deep(.verify) {
    width: 150px;
    border: 1px solid var(--border-color);
    height: 40px;
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > svg {
      pointer-events: none;
      width: 100% !important;
      height: 40px !important;
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
