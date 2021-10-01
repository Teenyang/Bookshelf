<template>
  <div class="Discount30">
    <BookList
      navTitle="Discount 30% OFF"
      :bookList="books"
      :inputText="searchText"
      @searchBook="searchText = $event.target.value"
    />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Discount30",
  components: { BookList },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    books() {
      const regex = new RegExp(this.searchText, "gi");
      return this.$store.getters["discount30Books"].filter((book) =>
        book.name.match(regex)
      );
    },
  },
};
</script>
