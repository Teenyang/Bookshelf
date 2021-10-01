<template>
  <div class="Ithelp">
    <BookList
      navTitle="Ithelp books"
      :bookList="books"
      :inputText="searchText"
      @searchBook="searchText = $event.target.value"
    />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Ithelp",
  components: { BookList },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    books() {
      const regex = new RegExp(this.searchText, "gi");
      return this.$store.getters["ithelpBook"].filter((book) =>
        book.name.match(regex)
      );
    },
  },
};
</script>
