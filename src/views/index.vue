<template>
  <div class="home">
    <img alt="logo" src="@/assets/imgs/logo.png" />
    <h2>Vite + Vue.js 3.0 + TypeScript</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Index",
});
</script>

<style lang="less" scoped>
.home{
  text-align: center;
}
</style>