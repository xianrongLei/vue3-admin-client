<template>
  <div
    class="layout-tabs-container flex-shrink-0 flex-grow-0 flex items-end box-border h-31px"
    :style="{ height: tabsHeight }"
  >
    <n-tabs
      type="card"
      size="small"
      placement="bottom"
      closable
    >
      <n-tab
        v-for="item in 4"
        :key="item"
        :name="'幸福' + item"
      >
        <span>寂寞{{ item }}</span>
      </n-tab>
      <template #prefix>
        <div
          style="transition: background 0.3s; background: var(--bg-color)"
          class="box-border flex items-center justify-center h-full p-x-4px cursor-pointer"
        >
          <a-svg-icon
            name="arrowDoubleLeft"
            :size="18"
            color="var(--text-soft-color)"
          />
        </div>
      </template>
      <template #suffix>
        <div
          style="transition: background 0.3s; background: var(--bg-color)"
          class="box-border flex items-center justify-center h-full p-x-4px cursor-pointer"
        >
          <a-svg-icon
            name="arrowDoubleRight"
            :size="18"
            color="var(--text-soft-color)"
          />
        </div>
      </template>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useAppStore from "@/store/modules/app";

const appStore = useAppStore();
const tabsHeight = computed(() => `${appStore.app_tabsHeight}px`);
</script>

<style lang="scss" scoped>
.layout-tabs-container {
  :deep(.n-tabs) {
    user-select: none;
    .n-tabs-nav__suffix,
    .n-tabs-nav__prefix {
      &:hover {
        background: rgba(var(--special-color-rgb), 0.05);
      }
      &:active {
        background: rgba(var(--special-color-rgb), 0.15);
      }
      padding: 0;
      border: 1px solid var(--border-color);
      box-sizing: border-box;
    }
    .n-tabs-pad {
      border: none;
    }
    .n-tabs-nav-scroll-content {
      border: none;

      .n-tabs-tab-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        .n-tabs-tab__label {
          padding-top: 2px;
        }
        .n-tabs-tab--active {
          background: rgba(var(--special-color-rgb), 0.2);
        }
        .n-tabs-tab {
          overflow: hidden;
          border-radius: 0;
          padding: 4px 4px 3px 10px;
          border: 1px solid var(--border-color);
        }
        .n-tabs-tab-pad {
          border: 0;
        }
      }
    }
  }
}
</style>
