<template>
  <n-icon
    v-if="vcon_name"
    :size="size"
    :color="color"
    :component="vcon_name"
  />
  <svg
    v-else
    :width="size"
    :height="size"
    :fill="color"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as vcons from "@vicons/ionicons5";

export default defineComponent({
  name: "ASvgIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "#333"
    },
    size: {
      type: Number,
      default: 25
    }
  },
  computed: {
    symbolId() {
      return `#icon-${this.name}`;
    },
    icon_name() {
      return this.name;
    },
    vcon_name() {
      return vcons[this.name];
    }
  }
});
</script>
