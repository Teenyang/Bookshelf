<template>
  <div class="BookList">
    <h1>{{ navTitle }}</h1>
    <p>共計 {{ bookList.length }} 本書</p>
    <label
      >搜尋書本：
      <!-- <input
        type="text"
        :value="inputText"
        @input="$emit('searchBook', $event)"
      /> -->
      <input
        type="text"
        :value="keyword"
        @input="$emit('update:keyword', $event)"
      />

      <!-- v-model example -->
      <!-- <input
        type="text"
        :value="inputText"
        @change="$emit('input', $event.target.value)"
      /> -->
    </label>
    <button :class="[isShelf ? 'image_mode' : '']" @click="isShelf = !isShelf">
      <template v-if="isShelf">顯示圖表</template>
      <template v-else>顯示表格</template>
    </button>

    <div class="bookshelf" v-if="isShelf">
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

    <div class="booktable" v-else>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th class="book_name">書名</th>
            <th>原價</th>
            <th>特價</th>
            <th>連結</th>
            <th>圖片</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in bookList" :key="book.id">
            <td>{{ book.ISBN }}</td>
            <td>{{ book.name }}</td>
            <td>{{ book.originPrice }}</td>
            <td class="bargain">{{ book.sellPrice }}</td>
            <td><a :href="book.link" target="_blank">連結</a></td>
            <td><img :src="book.image" alt="book image" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="button_top" @click="scrollToTop">
      <img src="@/assets/chevron-up.png" alt="Scroll To Top" />
    </button>
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
    // inputText: {
    keyword: {
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
  data() {
    return {
      isShelf: true,
    };
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
  label {
    display: block;
  }
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 6px;
    background-color: $dark-green;
    color: white;
    font-weight: bold;

    &:focus {
      border: none;
      outline: none;
    }
  }
  .image_mode {
    background-color: orange;
    color: $dark-green;
    font-weight: bold;
  }

  input {
    border-radius: 6px;
  }

  .button_top {
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

.booktable {
  margin: 20px auto;

  max-width: 90%;
  height: 920px;
  overflow-y: auto;

  border: 3px solid $dark-green;

  table {
    position: relative;
    width: 100%;

    thead {
      th {
        width: 10%;
        position: sticky;
        top: -5px;
        z-index: 5;

        box-shadow: 0 -1px 0 0px inset;
        background-color: $light-green;

        word-break: keep-all;
      }
      .book_name {
        width: 50%;
      }
    }

    th,
    td {
      min-width: 100px;
      padding: 20px;
      border: 1px solid $dark-green;
    }

    td.bargain {
      color: red;
      font-weight: bold;
    }

    img {
      max-width: 100px;
    }
  }
}
</style>
