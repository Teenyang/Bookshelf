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
    navPathOfLists() {
      return {
        all: "allBooks",
        ithelp: "ithelpBook",
        tracking: "trackingList",
      };
    },

    books() {
      // 導覽列路徑對應清單資料來源的getters名稱
      const gettersData = this.navPathOfLists[this.currentNav];
      return this.$store.getters[gettersData] || [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
