<template>
  <div class="overflow-hidden flex-shrink-0 flex-grow-0 z-3">
    <n-scrollbar :style="{ maxHeight: scrollbarHeight }">
      <div
        class="flex flex-col"
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
          style="
            box-shadow: var(--shadow-shallow);
            border-top: 1px solid var(--border-color);
            background-color: var(--bg-color);
          "
          :style="{ height: footerHeight }"
          class="layout-footer relative z-1 m-t-a flex flex-shrink-0 flex-grow-0 flex-items-center justify-center"
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
