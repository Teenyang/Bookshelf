<template>
  <div class="BookList">
    <h1>{{ $t(`navItem.${navTitle}`) }}</h1>
    <slot />

    <template v-if="bookList.length > 0">
      <p>{{ $t("book.total") }}：{{ bookList.length }}</p>
      <b-button
        :variant="isGallery ? 'primary' : 'danger'"
        @click="isGallery = !isGallery"
      >
        <template v-if="isGallery">{{ $t("book.table") }}</template>
        <template v-else>{{ $t("book.gallery") }}</template>
      </b-button>

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
              <div class="list_footer">
                <b-button :href="book.link" target="_blank" variant="secondary">
                  {{ $t("book.link") }}
                </b-button>

                <template v-if="isTracking(book.ISBN)">
                  <b-button @click="untrackBook(book)" variant="warning">
                    <b-icon icon="star-fill" aria-hidden="true" class="mr-2">
                    </b-icon>
                    <span>{{ $t("book.untracked") }}</span>
                  </b-button>
                </template>

                <template v-else>
                  <b-button @click="trackBook(book)" variant="secondary">
                    <b-icon icon="star" aria-hidden="true" class="mr-2">
                    </b-icon>
                    <span>{{ $t("book.tracking") }}</span>
                  </b-button>
                </template>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <div class="table_view" v-else>
        <b-table hover bordered sortable :items="bookList" :fields="fields">
          <template #head(track)>{{ $t("book.track") }}</template>
          <template #head(name)>{{ $t("book.title") }}</template>
          <template #head(originPrice)>{{ $t("book.originPrice") }}</template>
          <template #head(discount)>{{ $t("book.discount") }}</template>
          <template #head(sellPrice)>{{ $t("book.sellPrice") }}</template>
          <template #head(link)>{{ $t("book.link") }}</template>
          <template #head(image)>{{ $t("book.image") }}</template>

          <template #cell(track)="{ item }">
            <template v-if="isTracking(item.ISBN)">
              <b-icon
                @click="untrackBook(item)"
                icon="star-fill"
                aria-hidden="true"
                variant="warning"
              >
              </b-icon>
            </template>
            <template v-else>
              <b-icon @click="trackBook(item)" icon="star" aria-hidden="true">
              </b-icon>
            </template>
          </template>

          <template #cell(originPrice)="{ item }">
            ${{ item.originPrice }}
          </template>
          <template #cell(discount)="{ item }">
            {{ discount(item.sellPrice, item.originPrice)[$i18n.locale]
            }}{{ $t("book.percent") }}
          </template>
          <template #cell(sellPrice)="{ item }">
            ${{ item.sellPrice }}
          </template>
          <template #cell(link)="{ item }">
            <a :href="item.link" target="_blank">{{ $t("book.link") }}</a>
          </template>
          <template #cell(image)="{ item }">
            <img :src="item.image" alt="book image" />
          </template>
        </b-table>
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
  created() {
    this.$store.commit(
      "trackingList",
      JSON.parse(localStorage.getItem("TenlongList")) || []
    );
  },
  data() {
    return {
      isGallery: true,
    };
  },
  computed: {
    trackingList() {
      return this.$store.getters["trackingList"];
    },
    fields() {
      return [
        {
          key: "track",
          label: "track",
          thStyle: {
            width: "5em",
          },
        },
        {
          key: "ISBN",
          label: "ISBN",
          thStyle: {
            width: "10em",
          },
        },
        {
          key: "name",
          label: "書名",
        },
        {
          key: "originPrice",
          label: "售價",
          thStyle: {
            width: "8em",
          },
          tdClass: "origin_price",
        },
        {
          key: "discount",
          label: "折扣",
          sortable: true,
          thStyle: {
            width: "8em",
          },
          tdClass: "bargain",
        },
        {
          key: "sellPrice",
          label: "特價",
          thStyle: {
            width: "8em",
          },
          tdClass: "bargain",
        },
        {
          key: "link",
          label: "連結",
          thStyle: {
            width: "5em",
          },
        },
        {
          key: "image",
          label: "圖片",
          thStyle: {
            width: "10em",
          },
        },
      ];
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
    discount(sell, origin) {
      const bargain = (sell / origin) * 100;
      return {
        en: Math.floor(100 - bargain),
        zh:
          Math.ceil(bargain) % 10 === 0
            ? Math.ceil(bargain) / 10
            : Math.ceil(bargain),
      };
    },
    isTracking(bookISBN) {
      return this.trackingList.some((list) => list.ISBN === bookISBN);
    },
    trackBook(book) {
      // console.log("add: ", book.ISBN);
      this.$store.commit("trackingList", [...this.trackingList, book]);
      localStorage.setItem("TenlongList", JSON.stringify(this.trackingList));
    },
    untrackBook(book) {
      // console.log("remove: ", book.ISBN);
      const untrackIndex = this.trackingList.findIndex(
        (list) => list.ISBN === book.ISBN
      );
      this.$store.commit("trackingList", [
        ...this.trackingList.slice(0, untrackIndex),
        ...this.trackingList.slice(untrackIndex + 1),
      ]);
      localStorage.setItem("TenlongList", JSON.stringify(this.trackingList));
    },
  },
};
</script>

<style lang="scss" scoped>
.BookList {
  margin-top: 80px;

  .btn {
    font-weight: 600;
  }
  .b-icon {
    &:hover {
      cursor: pointer;
    }
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

    &:focus {
      border: 3px solid #003f85;
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

  .list_footer {
    margin-top: auto;

    display: flex;
    justify-content: space-between;
    gap: 1rem;

    & > * {
      width: 100%;
    }

    button {
      & > * {
        vertical-align: middle;
      }
    }
  }
}

.table_view {
  margin: 20px auto;

  max-width: 90%;
  max-height: 920px;
  overflow-y: auto;

  border: 3px solid $dark-green;

  table {
    margin-bottom: 0;
    width: 100%;
    position: relative;

    ::v-deep thead {
      th {
        position: sticky;
        top: -5px;
        z-index: 5;

        box-shadow: 0 -2px 0 0px inset;
        background-color: $dark-green;
        color: #fff;
        word-break: keep-all;
      }
      .book_name {
        width: 50%;
      }
    }

    ::v-deep td {
      vertical-align: middle;

      &.bargain {
        color: red;
        font-weight: bold;
      }
      &.origin_price {
        text-decoration: 2px line-through;
      }
    }

    img {
      max-width: 100px;
    }
  }
}
</style>
