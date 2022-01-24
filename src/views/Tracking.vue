<template>
  <div class="All">
    <BookList navTitle="tracking" :bookList="books" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "All",
  components: { BookList },
  computed: {
    books() {
      return JSON.parse(localStorage.getItem("Tenlong_tracking")) || [];
    },
  },
};
</script>
