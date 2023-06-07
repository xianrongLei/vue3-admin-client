<template>
  <Vcon
    v-if="vcon_name"
    :name="vcon_name"
    :size="size"
    :color="color"
  />
  <Icon
    v-else
    :name="name"
    :size="size"
    :color="color"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as vcons from "@vicons/ionicons5";
import Icon from "./icon.vue";
import Vcon from "./vIcon.vue";

export default defineComponent({
  name: "SvgIcon",
  components: {
    Icon,
    Vcon
  },
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
  setup(props) {
    return {
      icon_name: props.name,
      // @ts-ignore
      vcon_name: vcons[props.name]
    };
  }
});
</script>
