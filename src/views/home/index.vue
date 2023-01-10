<script lang="ts" setup>
import { ref } from "vue"
import Logo from "@/assets/logo.png"

withDefaults(
  defineProps<{
    msg?: string
  }>(),
  {
    msg: "@"
  }
)
const refContainer = ref()
const getUrl = () => (refContainer.value.style.background === "" ? `url(${Logo})` : "")
let count = $ref<number>(0)
const add = () => {
  refContainer.value.style.background = getUrl()
  count += 1
  console.log(refContainer.value.style.backgroundImage)
}
const sub = () => {
  refContainer.value.style.background = getUrl()
  count -= 1
  console.log(refContainer.value.style.backgroundImage)
}
</script>

<template>
  <div class="container" ref="refContainer">
    <button @click="add">+</button>{{ count }} {{ msg }}<button @click="sub">-</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 2px solid pink;
  height: 100vh;
  width: 100vw;
  background-image: "@/assets/logo.png";
}
</style>
