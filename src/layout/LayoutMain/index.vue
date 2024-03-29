<template>
  <div class="layout-main-container flex-shrink-0 flex-grow-0 z-3">
    <n-scrollbar :style="{ maxHeight: scrollbarHeight }">
      <div
        class="flex flex-col flex-shrink-0 flex-grow-0"
        :style="{ minHeight: mainHeight }"
      >
        <router-view v-slot="{ Component }">
          <transition
            name="route-animation"
            mode="out-in"
          >
            <keep-alive
              v-if="$route.meta.isCache"
              :max="100"
            >
              <component
                :is="Component"
                :key="$route.meta.id"
              />
            </keep-alive>
            <component
              v-else
              :is="Component"
              :key="$route.name"
            />
          </transition>
        </router-view>
        <div
          style="box-shadow: var(--shadow-shallow); border-top: 1px solid var(--border-color)"
          :style="{ height: footerHeight, minHeight: footerHeight }"
          class="layout-footer relative z-1 m-t-a flex flex-shrink-0 flex-grow-0 flex-items-center justify-center bg-[var(--bg-color)]"
        >
          Pink 2023 Vue3 Admin Starter
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useAppStore from "@/store/modules/app";

const log = (c: any) => {
  console.log(c);
};
const appStore = useAppStore();
// footer 高度
const footerHeight = computed(() => `${appStore.app_footerHeight - 1}px`);

// 滚动条区域高度 包含footer 额外减去2条边框
const scrollbarHeight = computed(() => `calc(100vh - (${appStore.app_headerHeight + appStore.app_tabsHeight}px))`);
// 主容器区域高度 不包含footer 额外减去3条边框
const mainHeight = computed(() => `calc(100vh - (${appStore.app_headerHeight + appStore.app_tabsHeight}px))`);
</script>

<style lang="scss">
.layout-main-container {
  /* 定义过渡效果 */
  .route-animation-enter-active {
    transition: opacity 0.4s;
    animation: route-animation-enter 0.4s;
  }
  .route-animation-leave-active {
    transition: opacity 0.3s;
  }
  .route-animation-enter {
    opacity: 0;
  }
  .route-animation-leave-to {
    opacity: 0;
  }
  @keyframes route-animation-enter {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(2500px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0);
    }
    75% {
      transform: translate3d(15px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
}
</style>
