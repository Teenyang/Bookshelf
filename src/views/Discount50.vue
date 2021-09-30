<template>
  <div class="Discount50">
    <BookList navTitle="Discount 50% OFF" :bookList="books" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Discount50",
  components: { BookList },
  computed: {
    books() {
      // return this.$store.getters["bookDiscount50"];
      return this.$store.getters["bookList"].filter(
        (book) =>
          0.5 <= book.sellPrice / book.originPrice &&
          book.sellPrice / book.originPrice < 0.6
      );
    },
  },
};
</script>
