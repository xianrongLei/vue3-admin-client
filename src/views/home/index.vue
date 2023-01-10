<script lang="ts" setup>
import { ref } from "vue"

defineProps<{ msg: string }>()

const count = ref(0)
const add = () => {
  count.value += 1
  console.log(count.value)
}
const sub = () => {
  count.value -= 1
}
</script>

<template>
  <div class="container" ref="refContainer">
    <button @click="add">disabled</button>
    {{ count }}
    <button @click="sub">disabled</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 2px solid pink;
  height: 100vh;
  width: 100vw;
}
</style>
