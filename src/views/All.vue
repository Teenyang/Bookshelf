<template>
  <div class="All">
    <BookList navTitle="all" :bookList="books" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "All",
  components: { BookList },
  computed: {
    books() {
      return this.$store.getters["allBooks"];
    },
  },
};
</script>
