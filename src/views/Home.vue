<template>
  <div class="Home">
    <BookList navTitle="tenlongInGoodideas" :bookList="searchText ? books : []">
      <label
        >{{ $t("book.search") }}：
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

    font-size: 20px;
    font-weight: 600;
  }

  input {
    padding: 4px 8px;
    border-radius: 6px;
  }
}
</style>
