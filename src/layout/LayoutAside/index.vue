<template>
  <div
    ref="layout_asideRef"
    style="box-shadow: var(--shadow-shallow); transition: width 0.2s; border-right: 1px solid var(--border-color)"
    class="layout-aside-container h-full flex flex-shrink-0 flex-grow-0 overflow-hidden relative top-0 left-0 z-4 bg-[var(--bg-color)]"
  >
    <!-- 窄菜单 -->
    <div
      ref="layout_xMenuRef"
      style="border-right: 1px solid var(--border-color)"
      class="flex-shrink-0 flex-grow-0 overflow-hidden h-full z-2 bg-[var(--bg-color)]"
    >
      <div
        class="cursor-pointer flex justify-center"
        :style="{ height: logoHeight }"
        @click="
          $router.push('/');
          layoutStore.useInitLayout();
        "
      >
        <img
          src="@/assets/logo.png"
          class="m-3"
          :style="{ maxWidth: logoHeight, maxHeight: logoHeight }"
        />
        <div
          class="m-l-3 flex flex-items-center justify-center font-500 text-9 tracking-3"
          v-show="!layoutStore.layout_isLargeWindow && layoutStore.layout_isMenuExpand"
        >
          {{ appConfig.appTitle }}
        </div>
      </div>
    </div>
    <!-- 收缩菜单 -->
    <div
      ref="layout_menuRef"
      class="overflow-hidden flex-shrink-0 flex-grow-0 h-full z-1 bg-[var(--bg-color)]"
    >
      <div
        class="relative flex flex-items-center justify-center font-500 text-7 tracking-3"
        :style="{ height: logoHeight, width: menuWidth }"
      >
        {{ appConfig.appTitle }}
        <n-divider title-placement="center">
          {{ appConfig.appTitle }}
        </n-divider>
      </div>
      <div>
        <button @click="$router.push('/2')">login2</button><br />
        <button @click="$router.push('/user')">user</button><br />
        <button @click="$router.push('/organ')">organ</button><br />
        <button @click="$router.push('/role')">role</button><br />
        <button @click="$router.push('/department')">department</button><br />
        <button @click="$router.push('/post')">post</button><br />
        <button @click="$router.push('/dictEntry')">dictEntry</button><br />
        <button @click="$router.push('/dictionary')">dictionary</button><br />
        <button @click="$router.push('/menu')">menu</button><br />
      </div>
    </div>
    <!-- 窄设备时菜单遮罩 -->
    <teleport to="body">
      <div
        ref="layout_maskRef"
        style="background-color: var(--mask-color)"
        class="hidden absolute top-0 left-0 w-screen h-screen z-3"
        @click="layoutStore.useMenuExpand()"
      ></div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useLayoutStore } from "@/store/modules/layout";
import { appConfig } from "@/config/index";

const layoutStore = useLayoutStore();
const layout_xMenuRef = ref(null);
const layout_asideRef = ref(null);
const layout_menuRef = ref(null);
const layout_maskRef = ref(null);

const logoHeight = computed(() => `${layoutStore.layout_headerHeight}px`);
const menuWidth = computed(() => `${layoutStore.layout_menuWidth}px`);

// 初始化侧边栏
onMounted(() => {
  layoutStore.useLayoutStateOperator("layout_asideRef", layout_asideRef.value);
  layoutStore.useLayoutStateOperator("layout_xMenuRef", layout_xMenuRef.value);
  layoutStore.useLayoutStateOperator("layout_menuRef", layout_menuRef.value);
  layoutStore.useLayoutStateOperator("layout_maskRef", layout_maskRef.value);
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
