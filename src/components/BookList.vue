<template>
  <div class="BookList">
    <h1>{{ navTitle }}</h1>
    <p>共計 {{ bookList.length }} 本書</p>
    <label
      >搜尋書本：
      <input
        type="text"
        :value="inputText"
        @input="$emit('searchBook', $event)"
      />
    </label>
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
    <button @click="scrollToTop">
      <img src="@/assets/chevron-up.png" alt="Scroll To Top" />
    </button>
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
    inputText: {
      type: String,
      required: false,
    },
    navTitle: {
      type: String,
      required: false,
    },
    bookList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.BookList {
  margin-top: 80px;
  h1 {
    margin-bottom: 20px;
  }
  & > p {
    margin-bottom: 20px;
  }

  input {
    border-radius: 6px;
  }

  button {
    padding: 10px 0;

    position: fixed;
    bottom: 10px;
    right: 10px;

    border: 3px solid #003f85;
    border-radius: 6px;
    background-color: white;

    img {
      width: 50%;
    }
  }
}
.bookshelf {
  margin-top: 20px;
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
