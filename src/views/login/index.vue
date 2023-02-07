<script lang="ts" setup>
import router from "@/router"
import { getLocalStorage } from "@/utils/storage"

const login = () => {
  console.log(getLocalStorage("token"))

  router.push("home")
}
</script>

<template>
  <div class="container">
    <button @click="login">login</button>
  </div>
</template>

<style lang="scss" scoped></style>
