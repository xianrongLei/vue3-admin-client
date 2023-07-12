<template>
  <div
    ref="app_asideRef"
    style="box-shadow: var(--shadow-shallow); transition: width 0.2s; border-right: 1px solid var(--border-color)"
    :style="{ width: `${appStore.app_asideWidth}px` }"
    class="layout-aside-container h-full flex flex-shrink-0 flex-grow-0 overflow-hidden relative top-0 left-0 z-4 bg-[var(--bg-color)] box-border"
  >
    <!-- 窄菜单 -->
    <SmallMenu />
    <!-- 收缩菜单 -->
    <ShrinkMenu />
    <!-- 抽屉菜单 -->
    <DrawerMenu />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import ShrinkMenu from "../components/shrinkMenu.vue";
import DrawerMenu from "../components/drawerMenu.vue";
import SmallMenu from "../components/smallMenu.vue";

const appStore = useAppStore();
// 初始化侧边栏
const app_asideRef = ref(null);
onMounted(() => {
  appStore.app_asideRef = app_asideRef.value;
});
</script>

<style lang="scss" scoped>
.layout-aside-container {
  :deep(.n-divider) {
    padding: 0 10px;
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    font-weight: 400;
    transform: translateY(50%);
  }
}
</style>
