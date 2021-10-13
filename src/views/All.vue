<template>
  <div class="All">
    <BookList
      navTitle="All"
      :bookList="books"
      :inputText="searchText"
      @searchBook="searchBookName"
    />
    <!-- v-model example -->
    <!-- <pre>{{ searchText }}</pre>
    <BookList
      navTitle="All"
      :bookList="books"
      v-model="searchText"
      :inputText="searchText"
    /> -->
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "All",
  components: { BookList },
  beforeRouterEnter(to, from, next) {
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
      value: "",
      inputText: "",
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
    searchBookName(event) {
      this.searchText = event.target.value;
      this.$router.push({
        name: this.$route.name, // ...this.$route,
        query: { search: event.target.value },
      });
    },
  },
};
</script>
