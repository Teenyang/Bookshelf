<template>
  <div class="All">
    <BookList
      navTitle="All"
      :bookList="books"
      :inputText="searchText"
      @searchBook="searchBookName($event)"
    />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "All",
  components: { BookList },
  created() {
    if (this.$route.query.search) {
      this.searchText = this.$route.query.search;
    }
  },
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
