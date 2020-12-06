<template>
  <div>{{ name }} - {{ price }}</div>
</template>

<script>
export default {
  props: {
    name: "String",
    price: "Number",
    // arr: "Array",
  },
  // mounted() {
  //   console.log(this.arr);
  // },
};
</script>

<style>
</style>