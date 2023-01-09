<template>
  <div class="layout-main">
    <router-view v-slot="{ Component }">
      <transition name="app-main" mode="out-in">
        <keep-alive exclude="" :max="10">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-main {
  overflow: auto;
}
</style>
