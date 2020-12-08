<template>
  <div>
    <header :class="[$style.header]">
      <div :class="$style.header__logo">MyShop</div>
      <Cart />
    </header>
    <div :class="[$style.main]">
      <h1>Список товаров:</h1>
      <div :class="$style.main__list">
        <Item v-for="id in getItemsOnPage" :key="id" :id="id" />
      </div>
      <Button @mySuperEvent>Загрузить еще</Button>
    </div>
  </div>
</template>

<script>
import Cart from "./components/Cart.vue";
import Item from "./components/Item.vue";
import Button from "./components/Button.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Cart,
    Item,
    Button,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    ...mapActions("goods", ["requestData"]),
  },
  computed: { ...mapGetters("goods", ["getItemsOnPage"]) },
  mounted() {
    this.requestData(1);
  },
};
</script>

<style module lang="css">
* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: rgb(31, 187, 166);
}

.header__logo {
  font-size: 22px;
  color: #fff;
}

.main {
  max-width: 80%;
  margin: auto;
}

.main__list {
  display: flex;
  justify-content: space-between;
}
</style>