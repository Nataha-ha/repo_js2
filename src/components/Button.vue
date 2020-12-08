<template>
  <button :class="[$style.btn]" @click="onBtnClicked">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    onBtnClicked() {
      this.$emit("mySuperEvent");
    },
  },
};
</script>

<style module lang="css">
.btn {
  padding: 4px 12px;
  outline: none;
  border-radius: 4px;
  color: #fff;
  background: rgb(31, 187, 166);
  cursor: pointer;
}

.btn:hover {
  background: rgb(27, 128, 114);
}
</style>