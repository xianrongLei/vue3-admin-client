<template>
  <div class="layout-aside">
    <div class="logo-container" :style="{ height: headerHeight }"></div>
    <div
      class="menu-container"
      :style="{
        height: `calc(100% -  ${headerHeight})`,
        maxHeight: `calc(100% -  ${headerHeight})`
      }"
    >
      1<br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      12<br />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  footerHeight?: string
  headerHeight?: string
}>()
</script>

<style lang="scss" scoped>
.layout-aside {
  width: 13.75rem;
  min-width: 13.75rem;
  max-width: 13.75rem;
  background: #ffffff;

  .logo-container {
    background: #ffffff;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-container {
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid #e2e3e5;
  }
}
</style>
