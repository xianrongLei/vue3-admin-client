<template>
  <div
    class="layout-tabs-container flex-shrink-0 flex-grow-0 flex items-end"
    :style="{ height: tabsHeight }"
  >
    <n-tabs
      type="card"
      size="small"
      closable
    >
      <n-tab
        v-for="item in 1"
        :key="item"
        :name="'幸福' + item"
      >
        寂寞围绕着电视
      </n-tab>
      <n-tab name="的"> 垂死坚持 </n-tab>
      <n-tab name="旁边"> 在两点半消失 </n-tab>
      <template #prefix> Prefix </template>
      <template #suffix> Suffix </template>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useLayoutStore from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const tabsHeight = computed(() => `${layoutStore.layout_tabsHeight}px`);
</script>

<style lang="scss" scoped>
.layout-tabs-container {
  :deep(.n-tabs) {
    margin-bottom: 2px;
    .n-tabs-tab-wrapper {
      .n-tabs-tab {
        min-width: 50px;
        transition: width 2s;
      }
      &:hover {
        .n-base-close {
          display: flex;
        }
      }
      .n-base-close {
        display: none;
      }
    }
  }
}
</style>
