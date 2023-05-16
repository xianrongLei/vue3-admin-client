<template>
  <div class="layout-header">
    <button @click="useMenuExpand()">test</button>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from "@/store/modules/layout";

const { useMenuExpand } = useLayoutStore();
</script>

<style lang="scss" scoped>
.layout-header {
  background: #ffffff;
  border-bottom: 1px solid #dcdfe6;
}
</style>
