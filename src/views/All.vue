<template>
  <div class="All">
    <BookList
      navTitle="All"
      :bookList="books"
      :inputText="searchText"
      @searchBook="searchText = $event.target.value"
    />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "All",
  components: { BookList },
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
};
</script>
