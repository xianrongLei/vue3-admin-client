<template>
  <div
    ref="layout_asideRef"
    style="box-shadow: var(--shadow-shallow); transition: width 0.2s; border-right: 1px solid var(--border-color)"
    :style="{ width: `${layoutStore.layout_asideWidth}px` }"
    class="layout-aside-container h-full flex flex-shrink-0 flex-grow-0 overflow-hidden relative top-0 left-0 z-4 bg-[var(--bg-color)]"
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
import { useLayoutStore } from "@/store/modules/layout";
import ShrinkMenu from "../components/shrinkMenu.vue";
import DrawerMenu from "../components/drawerMenu.vue";
import SmallMenu from "../components/smallMenu.vue";

const layoutStore = useLayoutStore();
// 初始化侧边栏
const layout_asideRef = ref(null);
onMounted(() => {
  layoutStore.layout_asideRef = layout_asideRef.value;
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
