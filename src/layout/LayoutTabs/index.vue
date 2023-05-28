<template>
  <div
    class="flex-shrink-0 flex-grow-0"
    :style="{ height: tabsHeight }"
  ></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useLayoutStore from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const tabsHeight = computed(() => `${layoutStore.layout_tabsHeight}px`);
</script>
