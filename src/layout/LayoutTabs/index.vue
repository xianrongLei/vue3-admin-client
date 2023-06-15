<template>
  <div
    class="flex-shrink-0 flex-grow-0 flex items-end"
    :style="{ height: tabsHeight }"
  >
    <n-tabs
      class="w-full max-w-100%"
      type="card"
      size="small"
      closable
      addable
    >
      <n-tab
        v-for="item in 10"
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
