<template>
  <div class="Discount30">
    <BookList navTitle="Discount 30% OFF" :bookList="books" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Discount30",
  components: { BookList },
  computed: {
    books() {
      // return this.$store.getters["bookDiscount30"];s
      return this.$store.getters["bookList"].filter(
        (book) =>
          0.7 <= book.sellPrice / book.originPrice &&
          book.sellPrice / book.originPrice < 0.8
      );
    },
  },
};
</script>
