import {
  create,
  createDiscreteApi,
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
  NDivider,
  NScrollbar,
  NTab,
  NTable,
  NDataTable,
  NMenu,
  NPopover,
  NBreadcrumb,
  NBreadcrumbItem,
  NDrawerContent,
  NDrawer,
  NCard,
  NGrid,
  NGridItem,
  NTabs,
  useOsTheme
} from "naive-ui";
import type { DiscreteApi } from "naive-ui/es/discrete/src/interface";
import { themeMap } from "@/store/modules/theme/theme.map";
import type { ThemeState } from "@/store/modules/theme";

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
    NLoadingBarProvider,
    NDivider,
    NScrollbar,
    NTab,
    NTable,
    NDataTable,
    NMenu,
    NPopover,
    NBreadcrumb,
    NBreadcrumbItem,
    NDrawerContent,
    NDrawer,
    NCard,
    NGrid,
    NGridItem,
    NTab,
    NTabs
  ]
});

export const mountNaive = (vueUse: Function): void => {
  vueUse(naive);
};

/**
 * 使用独立api  处理主题切换独立api主题不更新问题
 * @param mode
 * @param discreteApiType
 * @returns
 */
export const discreteApi: DiscreteApi & { theme: ThemeState["theme_mode"] } = {
  theme: "dark",
  ...createDiscreteApi(["loadingBar", "message", "dialog", "notification"], {
    configProviderProps: {
      theme: {
        name: "dark",
        ...themeMap.dark.theme_naiveOverrides
      }
    }
  })
};
/**
 * 调用挂载独立api
 * @param theme
 */
export const mountDiscreteApi = (theme: ThemeState["theme_mode"]) => {
  if (discreteApi.theme !== theme) {
    discreteApi.unmount();
    const APi = createDiscreteApi(["loadingBar", "message", "dialog", "notification"], {
      configProviderProps: {
        theme: {
          name: theme,
          ...themeMap[theme].theme_naiveOverrides
        }
      }
    });
    Object.assign(discreteApi, { theme, ...APi });
  }
};
