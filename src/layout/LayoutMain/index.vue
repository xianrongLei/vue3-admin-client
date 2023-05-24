<template>
  <div class="layout-main">
    <n-scrollbar :style="{ maxHeight: scrollbarHeight }">
      <div
        class="layout-main-wrapper"
        :style="{ minHeight: mainHeight }"
      >
        <router-view v-slot="{ Component }">
          <transition
            name="app-main"
            mode="out-in"
          >
            <keep-alive
              exclude=""
              :max="10"
            >
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <div
          class="layout-footer"
          :style="{ height: footerHeight }"
        >
          Pink 2023 Vue3 Admin Starter
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useLayoutStore from "@/store/modules/layout";

const layoutStore = useLayoutStore();
// footer 高度
const footerHeight = computed(() => `${layoutStore.layout_footerHeight - 1}px`);
// 滚动条区域高度 包含footer 额外减去2条边框
const scrollbarHeight = computed(
  () => `calc(100vh - (${layoutStore.layout_headerHeight + layoutStore.layout_tabsHeight + 2}px))`
);
// 主容器区域高度 不包含footer 额外减去3条边框
const mainHeight = computed(
  () => `calc(100vh - (${layoutStore.layout_headerHeight + layoutStore.layout_tabsHeight + 2}px))`
);
</script>

<style lang="scss" scoped>
.layout-main {
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 2;
  .layout-main-wrapper {
    display: flex;
    flex-direction: column;
    .layout-footer {
      margin-top: auto;
      position: relative;
      box-shadow: 0 0 5px 5px rgba(var(--shadow-color-rgb), 0.1);
      border-top: 1px solid var(--border-color);
      background-color: var(--bg-color);
      display: flex;
      flex-shrink: 0;
      flex-grow: 0;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
