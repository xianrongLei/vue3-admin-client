<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: Object,
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
  }
});
</script>

<template>
  <n-icon
    :size="size"
    :color="color"
    :component="name"
  />
</template>
