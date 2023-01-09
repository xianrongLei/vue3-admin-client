<template>
  <div class="layout-header" :style="{ height: headerHeight, minHeight: headerHeight }"></div>
</template>

<script lang="ts" setup>
defineProps<{
  headerHeight?: string
}>()
</script>

<style lang="scss" scoped>
.layout-header {
  background: #ffffff;
  border-bottom: 1px solid #dcdfe6;
}
</style>
