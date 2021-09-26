<template>
  <div class="All">
    <h1>All books</h1>
    <div class="bookshelf">
      <div class="book" v-for="book in bookList" :key="book.id">
        <img :src="book.image" alt="book image" />
        <p>
          原價：<span>{{ book.originPrice }}</span> ｜ 特價：<span
            class="bargain"
            >{{ book.sellPrice }}</span
          >
        </p>
        <p>
          ISBN：<span>{{ book.ISBN }}</span>
        </p>
        <p>
          <span>{{ book.name }}</span>
        </p>
        <a :href="book.link" target="_blank">連結</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "All",
  data() {
    return {};
  },
  created() {
    //   axios
    //     .get("https://bookshelf.goodideas-studio.com/api")
    //     .then((response) => (this.bookList = response.data.list));
    this.$store.dispatch("fetchBookList");
  },
  computed: {
    bookList() {
      return this.$store.getters["bookList"];
    },
  },
};
</script>
<style lang="scss" scoped>
.bookshelf {
  padding: 0 40px;
  display: grid;
  grid-template-columns: max(100%);
  justify-content: center;
  gap: 30px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(250px, 400px));
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(250px, 400px));
  }
}
.book {
  padding: 20px;
  border: 1px solid $dark-green;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  img {
    margin-bottom: 20px;
    height: 200px;
    object-fit: contain;
  }
  span {
    font-weight: bold;
  }
  .bargain {
    color: red;
  }

  a {
    margin-top: auto;
    padding: 5px;
    border: 1px solid $dark-green;
    border-radius: 5px;
    background-color: $dark-green;

    color: #fff;
    font-weight: bold;

    &:hover {
      color: $light-green;
      text-decoration: none;
    }
  }
}
</style>
