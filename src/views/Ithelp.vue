<template>
  <div class="Ithelp">
    <BookList navTitle="ithelp" :bookList="books" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Ithelp",
  components: { BookList },
  computed: {
    books() {
      return this.$store.getters["ithelpBook"];
    },
  },
};
</script>
