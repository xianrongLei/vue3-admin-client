<template>
  <n-config-provider
    :locale="langInfo.local"
    :date-locale="langInfo.date"
    class="h-screen"
    :theme-overrides="themeStore.theme_naiveOverrides"
  >
    <NThemeEditor v-if="themeStore.theme_naiveEditor" />
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import type { NDateLocale } from "naive-ui";
import { NThemeEditor, zhCN, dateZhCN, enUS, dateEnUS } from "naive-ui";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/store/modules/theme/index";
import { mountDiscreteApi } from "@/naive/index";

const themeStore = useThemeStore();
const { locale } = useI18n();
/**
 * 挂载naive-ui 独立api
 */
watch(
  () => themeStore.theme_mode,
  (newTheme) => {
    mountDiscreteApi(newTheme);
  },
  {
    immediate: true
  }
);
/**
 * 切换app显示语言
 */
const langInfo = computed((): { local: typeof zhCN; date: NDateLocale } => {
  switch (locale.value) {
    case "zh":
      return {
        local: zhCN,
        date: dateZhCN
      };
    case "en":
      return {
        local: enUS,
        date: dateEnUS
      };
    default:
      return {
        local: zhCN,
        date: dateZhCN
      };
  }
});
</script>
