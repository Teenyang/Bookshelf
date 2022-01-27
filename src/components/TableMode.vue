<template>
  <div class="TableMode">
    <b-table
      hover
      bordered
      head-variant="dark"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items="data"
      :fields="fields"
    >
      <template #head(track)>{{ $t("book.track") }}</template>
      <template #head(name)>{{ $t("book.title") }}</template>
      <template #head(originPrice)>{{ $t("book.originPrice") }}</template>
      <template #head(discount)>{{ $t("book.discount") }}</template>
      <template #head(sellPrice)>{{ $t("book.sellPrice") }}</template>
      <template #head(link)>{{ $t("book.link") }}</template>
      <template #head(image)>{{ $t("book.image") }}</template>

      <template #cell(track)="{ item }">
        <template v-if="item.isTracking">
          <b-icon
            @click="$emit('untrack', item)"
            icon="star-fill"
            aria-hidden="true"
            variant="warning"
          >
          </b-icon>
        </template>
        <template v-else>
          <b-icon @click="$emit('track', item)" icon="star" aria-hidden="true">
          </b-icon>
        </template>
      </template>

      <template #cell(originPrice)="{ item }">
        ${{ item.originPrice }}
      </template>
      <template #cell(discount)="{ item }">
        {{ calcDiscount(item.sellPrice, item.originPrice)[$i18n.locale]
        }}{{ $t("book.percent") }}
      </template>
      <template #cell(sellPrice)="{ item }"> ${{ item.sellPrice }} </template>
      <template #cell(link)="{ item }">
        <a :href="item.link" target="_blank">{{ $t("book.link") }}</a>
      </template>
      <template #cell(image)="{ item }">
        <img :src="item.image" alt="book image" />
      </template>
    </b-table>
  </div>
</template>

<script>
import calcDiscountByLocale from "@/utilities/calcDiscount.js";
export default {
  name: "TableMode",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: "sellPrice",
      sortDesc: false,
    };
  },
  computed: {
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
          thStyle: {
            width: "8em",
          },
          tdClass: "bargain",
        },
        {
          key: "sellPrice",
          label: "特價",
          sortable: true,
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
    calcDiscount: calcDiscountByLocale,
  },
};
</script>

<style lang="scss" scoped>
.TableMode {
  margin: 20px auto;
  max-width: 90%;
  max-height: 920px;
  overflow-y: auto;

  border: 3px solid $dark-green;

  ::v-deep .table {
    margin-bottom: 0;
    width: 100%;
    position: relative;

    .thead-dark th {
      border-color: white;
    }
    th {
      position: sticky;
      top: -1px;
      z-index: 5;

      box-shadow: 0 -2px 0 0px inset;
      background-color: $dark-green;
      color: #fff;
      word-break: keep-all;
    }

    td {
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
  .b-icon {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
