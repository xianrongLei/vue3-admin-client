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
          style="transition: background 0.3s; background-color: var(--bg-color)"
          class="box-border flex items-center justify-center h-full p-x-4px cursor-pointer"
        >
          <a-svg-icon
            name="arrowDoubleLeft"
            :size="18"
            color="var(--special-color)"
          />
        </div>
      </template>
      <template #suffix>
        <div
          style="transition: background 0.3s; background-color: var(--bg-color)"
          class="box-border flex items-center justify-center h-full p-x-4px cursor-pointer"
        >
          <a-svg-icon
            name="arrowDoubleRight"
            :size="18"
            color="var(--special-color)"
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
      transition: all 0.3s;
      &:hover {
        background-color: rgba(var(--special-color-rgb), 0.5);
      }
      &:active {
        background-color: rgba(var(--special-color-rgb), 0.4);
        svg {
          fill: rgba(var(--special-color-rgb), 0.9);
        }
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
          border-bottom: 1px solid !important;
          .n-base-close {
            transform: scale(1) translateX(0) !important;
          }
          .n-tabs-tab__label {
            transform: translateX(0) !important;
          }
        }
        .n-tabs-tab {
          overflow: hidden;
          border-radius: 0;
          padding: 4px 4px 3px 10px;
          border: 1px solid var(--border-color);
          .n-base-close {
            transition: transform 0.3s;
            transform: scale(0) translateX(-100%);
          }
          .n-tabs-tab__label {
            transition: transform 0.3s;
            transform: translateX(9px);
          }
          &:hover {
            .n-base-close {
              transform: scale(1) translateX(0);
            }
            .n-tabs-tab__label {
              transform: translateX(0);
            }
          }
        }
        .n-tabs-tab-pad {
          border: 0;
        }
      }
    }
  }
}
</style>
