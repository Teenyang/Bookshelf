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

      <template v-if="isGallery">
        <GalleryMode
          :data="bookList"
          :trackingList="trackingList"
          @untrack="untrackBook"
          @track="trackBook"
        />
      </template>

      <template v-else>
        <TableMode
          :data="bookList"
          :trackingList="trackingList"
          @untrack="untrackBook"
          @track="trackBook"
        />
      </template>

      <button class="scroll_top" @click="scrollToTop">
        <img src="@/assets/chevron-up.png" alt="Scroll To Top" />
      </button>
    </template>
  </div>
</template>

<script>
import GalleryMode from "@/components/GalleryMode.vue";
import TableMode from "@/components/TableMode.vue";

export default {
  name: "BookList",
  components: { GalleryMode, TableMode },
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
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
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

  .scroll_top {
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
</style>
