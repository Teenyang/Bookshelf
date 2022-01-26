<template>
  <div class="MainPage">
    <BookList
      :navTitle="currentNav ? $t(`navItem.${currentNav}`) : ''"
      :bookList="books"
    />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
import Constants from "@/utilities/Constants.js";

export default {
  name: "MainPage",
  components: { BookList },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.currentNav = to.params.nav;
      console.log("beforeRouteEnter currentNav: ", vm.currentNav);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.currentNav = to.params.nav;
    console.log("beforeRouteUpdate currentNav: ", this.currentNav);
    next();
  },
  data() {
    return {
      currentNav: "",
    };
  },
  computed: {
    books() {
      return this.$store.getters[`${Constants[this.currentNav]}`] || [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
