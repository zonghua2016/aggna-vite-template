<template>
  <div class="countup">
    <div class="wrap">
      父组件数据：
      <button @click="reduceLocal">-</button>
      <input type="text" v-model="number" />
      <button @click="addLocal">+</button>
    </div>
    <div class="wrap">
      子组件数据：
      <button @click="reduce">-</button>
      <input type="text" v-model="localNumber" />
      <button @click="add">+</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, withDefaults, defineProps, defineEmits } from "vue";
// setup 方式
interface Props {
  number: Number;
}
const props = withDefaults(defineProps<Props>(), {
  number: 0,
});

const emit = defineEmits(["addLocal", "reduceLocal"]);

const localNumber = ref(0);

const add = () => {
  localNumber.value += 1;
};
const reduce = () => {
  localNumber.value -= 1;
};

const addLocal = () => {
  emit("addLocal");
};
const reduceLocal = () => {
  emit("reduceLocal");
};

// watchEffect(() => {
//   console.log(props.number);
// });
</script>

<style lang="less" scoped>
.countup {
  margin-top: 80px;

  .wrap {
    margin-bottom: 10px;

    button {
      width: 30px;
      height: 30px;
    }

    input {
      width: 80px;
      height: 30px;
      margin: 0 5px;
      box-sizing: border-box;
    }
  }
}
</style>
