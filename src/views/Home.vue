<template>
  <div class="Home">
    <BookList navTitle="tenlong" :bookList="searchText ? books : []">
      <label
        >搜尋書本：
        <input type="text" v-model="searchText" />
      </label>
    </BookList>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  name: "Home",
  components: {
    BookList,
  },

  data() {
    return {
      searchText: "",
    };
  },

  computed: {
    books() {
      const regex = new RegExp(this.searchText, "gi");
      return this.$store.getters["allBooks"].filter((book) =>
        book.name.match(regex)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.Home {
  label {
    margin-bottom: 20px;
    // display: block;

    font-size: 20px;
    font-weight: 600;
  }
}
</style>
