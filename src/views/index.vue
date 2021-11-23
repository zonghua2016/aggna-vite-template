<template>
  <div class="home">
    <img alt="logo" src="@/assets/imgs/logo.png" />
    <h2>Vite + Vue.js 3.0 + TypeScript</h2>
    <CountUp :number="number" @addLocal="addLocal" @reduceLocal="reduceLocal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CountUp from "./CountUp.vue";
export default defineComponent({
  name: "Index",
  components: { CountUp },
  setup(props) {
    const number = ref(0);
    const addLocal = () => {
      number.value += 1;
    };
    const reduceLocal = () => {
      number.value -= 1;
    };

    return { number, addLocal, reduceLocal };
  },
});
</script>

<style lang="less" scoped>
.home {
  text-align: center;
}
</style>