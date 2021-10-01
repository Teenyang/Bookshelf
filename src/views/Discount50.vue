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
      return this.$store.getters["discount50Books"];
    },
  },
};
</script>
