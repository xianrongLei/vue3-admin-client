import {
  create,
  NButton,
  NInput,
  NForm,
  NFormItem,
  NInputNumber,
  NSpace,
  NIcon,
  NSpin,
  NMessageProvider,
  NConfigProvider,
  NThemeEditor,
  NLoadingBarProvider,
  useOsTheme,
  lightTheme,
  darkTheme,
  createDiscreteApi
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NForm,
    NFormItem,
    NInput,
    NInputNumber,
    NSpace,
    NIcon,
    NSpin,
    NMessageProvider,
    NConfigProvider,
    NThemeEditor,
    NLoadingBarProvider
  ]
});

export const mountNaive = (vueUse: Function): void => {
  vueUse(naive);
};
/**
 * naive 全局独立api
 */
export const { loadingBar, message } = createDiscreteApi(["loadingBar", "message"], {
  configProviderProps: {
    theme: useOsTheme().value === "light" ? lightTheme : darkTheme
  }
});
