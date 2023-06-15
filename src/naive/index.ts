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
  NTabs
} from "naive-ui";
import { DiscreteApi, DiscreteApiType } from "naive-ui/es/discrete/src/interface";
import { ThemeState } from "@/store/modules/theme";
import { themeMap } from "@/store/modules/theme/theme.map";

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
 * theme  记录主题是否变更
 * discreteApiVm DiscreteApi缓存
 */
const theme = { value: "" };

const discreteApiVm: Record<DiscreteApiType, any> = {
  loadingBar: null,
  message: null,
  dialog: null,
  notification: null
};

/**
 * 使用独立api  主要为了处理主题切换独立api主题不更新问题
 * @param mode
 * @param discreteApiType
 * @returns
 */
export const useDiscreteApi = <T>(
  mode: ThemeState["theme_mode"],
  discreteApiType: DiscreteApiType
): DiscreteApi[T & DiscreteApiType] => {
  // loading每次使用完后都销毁 防止主题不统一 和 多个loadingBar重叠问题
  if (discreteApiType === "loadingBar") {
    if (discreteApiVm[discreteApiType]) {
      discreteApiVm[discreteApiType]?.finish(); // 存在时先关闭加载条
    }
    discreteApiVm[discreteApiType] = createDiscreteApi([discreteApiType], {
      configProviderProps: {
        theme: themeMap[mode].theme_naiveOverrides
      }
    })[discreteApiType];
    return discreteApiVm[discreteApiType];
  }
  // 其他api先暂时只更具mode变化在重新生成
  if (theme.value === mode && discreteApiVm[discreteApiType]) {
    return discreteApiVm[discreteApiType];
  }
  theme.value = mode;
  // 此时为mode变化或api不存在
  discreteApiVm[discreteApiType] = createDiscreteApi([discreteApiType], {
    configProviderProps: {
      theme: themeMap[mode].theme_naiveOverrides
    }
  })[discreteApiType];
  return discreteApiVm[discreteApiType];
};
