<template>
  <div class="BookList">
    <h1>{{ $t(`navItem.${navTitle}`) }}</h1>
    <slot />

    <template v-if="bookList.length > 0">
      <p>{{ $t("book.total") }}：{{ bookList.length }}</p>
      <button
        :class="[isGallery ? 'gallery_mode' : '']"
        @click="isGallery = !isGallery"
      >
        <template v-if="isGallery">{{ $t("book.table") }}</template>
        <template v-else>{{ $t("book.gallery") }}</template>
      </button>

      <div class="gallery_view" v-if="isGallery">
        <b-container fluid="xl">
          <b-row>
            <b-col
              cols="12"
              md="6"
              lg="4"
              class="book"
              v-for="book in bookList"
              :key="book.id"
            >
              <img :src="book.image" alt="book image" />
              <p>
                {{ $t("book.originPrice") }}：
                <span class="book_origin_price">${{ book.originPrice }}</span>
                <span class="book_discount"
                  >{{ discount(book.sellPrice, book.originPrice)[$i18n.locale]
                  }}{{ $t("book.percent") }}</span
                >
              </p>
              <p>
                {{ $t("book.sellPrice") }}：<span class="bargain"
                  >${{ book.sellPrice }}</span
                >
              </p>
              <p>
                ISBN：<span>{{ book.ISBN }}</span>
              </p>
              <p>
                <span>{{ book.name }}</span>
              </p>
              <a :href="book.link" target="_blank">{{ $t("book.link") }}</a>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="table_view" v-else>
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th class="book_name">{{ $t("book.title") }}</th>
              <th>{{ $t("book.originPrice") }}</th>
              <th>{{ $t("book.discount") }}</th>
              <th>{{ $t("book.sellPrice") }}</th>
              <th>{{ $t("book.link") }}</th>
              <th>{{ $t("book.image") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in bookList" :key="book.id">
              <td>{{ book.ISBN }}</td>
              <td>{{ book.name }}</td>
              <td class="book_origin_price">${{ book.originPrice }}</td>
              <td class="book_discount">
                {{ discount(book.sellPrice, book.originPrice)[$i18n.locale]
                }}{{ $t("book.percent") }}
              </td>
              <td class="bargain">${{ book.sellPrice }}</td>
              <td>
                <a :href="book.link" target="_blank">{{ $t("book.link") }}</a>
              </td>
              <td><img :src="book.image" alt="book image" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="button_top" @click="scrollToTop">
        <img src="@/assets/chevron-up.png" alt="Scroll To Top" />
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
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
      isGallery: true,
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
    discount(sell, origin) {
      const bargain = (sell / origin) * 100;
      return {
        en: Math.floor(100 - bargain),
        zh: bargain % 10 === 0 ? bargain / 10 : Math.ceil(bargain),
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.BookList {
  margin-top: 80px;

  button {
    margin: 0 auto;
    padding: 5px 10px;
    border: none;
    border-radius: 6px;

    display: block;
    background-color: $dark-green;
    color: white;
    font-weight: bold;

    &:focus {
      border: none;
      outline: none;
    }
  }
  .gallery_mode {
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
.gallery_view {
  margin-top: 20px;
  padding: 0 40px;
}
.book {
  padding: 20px;
  border: 1px solid $dark-green;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  &_origin_price {
    margin-right: 10px;
    text-decoration: 2px line-through;
  }

  img {
    margin-bottom: 20px;
    height: 200px;
    object-fit: contain;
  }
  span {
    font-weight: bold;
  }

  &_discount,
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

.table_view {
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
