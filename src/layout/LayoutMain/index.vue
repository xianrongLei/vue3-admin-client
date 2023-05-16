<template>
  <div
    class="layout-main"
    :style="{ height: mainHeight }"
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
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useLayoutStore from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const mainHeight = computed(
  () => `calc(100vh - (${layoutStore.layout_headerHeight + layoutStore.layout_tabsHeight}px))`
);
</script>

<style lang="scss" scoped>
.layout-main {
  overflow: auto;
}
</style>
