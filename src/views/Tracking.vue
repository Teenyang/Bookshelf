<template>
  <div class="Tracking">
    <BookList navTitle="tracking" :bookList="trackingList" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Tracking",
  components: { BookList },
  computed: {
    trackingList() {
      return this.$store.getters["trackingList"];
    },
  },
};
</script>
