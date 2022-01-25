<template>
  <div class="GalleryMode">
    <b-container fluid="xl">
      <b-row>
        <b-col
          cols="12"
          md="6"
          lg="4"
          class="book"
          v-for="book in data"
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
              <b-button @click="$emit('untrack', book)" variant="warning">
                <b-icon icon="star-fill" aria-hidden="true" class="mr-2">
                </b-icon>
                <span>{{ $t("book.untracked") }}</span>
              </b-button>
            </template>
            <template v-else>
              <b-button @click="$emit('track', book)" variant="secondary">
                <b-icon icon="star" aria-hidden="true" class="mr-2"> </b-icon>
                <span>{{ $t("book.tracking") }}</span>
              </b-button>
            </template>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "GalleryMode",
  props: {
    data: {
      type: Array,
      required: true,
    },
    trackingList: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
.GalleryMode {
  margin-top: 20px;
  padding: 0 40px;

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

    &_origin_price {
      margin-right: 10px;
      text-decoration: 2px line-through;
    }
    &_discount,
    .bargain {
      color: red;
    }
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
</style>
