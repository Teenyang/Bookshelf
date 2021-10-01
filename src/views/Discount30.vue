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
      return this.$store.getters["discount30Books"];
    },
  },
};
</script>
