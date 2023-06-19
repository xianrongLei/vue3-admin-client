<template>
  <div
    class="layout-header flex items-center flex-shrink-0 flex-grow-0"
    :style="{ height: headerHeight }"
    style="border-bottom: 1px solid var(--border-color)"
  >
    <div class="h-full flex justify-center items-center w-50px">
      <a-svg-icon
        @click="layoutStore.useMenuExpand()"
        :name="layoutStore.layout_isShrinkMenuExpand ? 'switchOff' : 'switchOn'"
        :size="24"
        class="cursor-pointer"
        color="var(--text-soft-color)"
      />
    </div>
    <n-breadcrumb
      class="layout-header-breadcrumb flex items-center text-23px"
      separator="/"
    >
      <n-breadcrumb-item
        v-for="(item, index) in $route.meta.breadcrumb"
        :key="index"
      >
        {{ item }}</n-breadcrumb-item
      >
    </n-breadcrumb>
    <div class="m-l-a">
      <button @click="themeStore.useThemeSetMode(themeStore.theme_mode === 'dark' ? 'light' : 'dark')">mode</button>
      <button @click="checkLang">lang</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLayoutStore } from "@/store/modules/layout";
import { useThemeStore } from "@/store/modules/theme";

const layoutStore = useLayoutStore();
const themeStore = useThemeStore();
const headerHeight = computed(() => `${layoutStore.layout_headerHeight}px`);

const { locale } = useI18n();
const checkLang = () => {
  locale.value = locale.value === "zh" ? "en" : "zh";
};
</script>

<style lang="scss">
.layout-header {
  > :first-child svg {
    transition: background 0.5s;
    border-radius: 5px;
    &:hover {
      background-color: rgba(var(--special-color-rgb), 0.1);
    }
  }
  @media screen and (max-width: 600px) {
    .layout-header-breadcrumb {
      display: none;
    }
  }
}
</style>
