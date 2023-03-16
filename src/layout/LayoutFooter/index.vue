<template>
  <div
    class="layout-footer"
    :style="{ height: footerHeight }"
  ></div>
</template>

<script lang="ts" setup>
defineProps<{
  footerHeight?: string
}>()
</script>

<style lang="scss" scoped>
.layout-footer {
  background: #ffffff;
  border-top: 1px solid #dcdfe6;
  color: #888;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
