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
        <router-view></router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NThemeEditor, zhCN, dateZhCN, enUS, dateEnUS, NDateLocale } from "naive-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/store/modules/theme/index";

const { locale } = useI18n();
const themeStore = useThemeStore();
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
