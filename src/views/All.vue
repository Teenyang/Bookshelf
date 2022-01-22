<template>
  <div class="All">
    <!-- <BookList
      navTitle="All"
      :bookList="books"
      :keyword="searchText"
      @update:keyword="searchBook"
    /> -->
    <!-- @update:keyword="searchText = $event.target.value" -->

    <!-- v-model example -->
    <BookList navTitle="All" :bookList="books" v-model="searchText" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "All",
  components: { BookList },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.query.search) {
        vm.searchText = to.query.search;
      }
    });
  },
  // created() {
  //   if (this.$route.query.search) {
  //     this.searchText = this.$route.query.search;
  //   }
  // },
  data() {
    return {
      searchText: "",
    };
  },

  computed: {
    books() {
      const regex = new RegExp(this.searchText, "gi");
      return this.$store.getters["allBooks"].filter((book) =>
        book.name.match(regex)
      );
    },
  },
  methods: {
    searchBook(event) {
      this.searchText = event.target.value;
      this.$router.push({
        name: this.$route.name, // ...this.$route,
        query: { search: event.target.value },
      });
    },
  },
};
</script>
