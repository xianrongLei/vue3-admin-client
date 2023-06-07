<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
      default: 15
    }
  },
  computed: {
    symbolId() {
      return `#icon-${this.name}`;
    }
  }
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :fill="color"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>
