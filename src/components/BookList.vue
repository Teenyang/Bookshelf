<template>
  <div class="BookList">
    <h1>{{ navTitle }}</h1>
    <pre>trackingISBNs: {{ trackingISBNs }}</pre>
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
          :trackingISBNs="trackingISBNs"
          @untrack="showConfirmModal"
          @track="trackBook"
        />
      </template>

      <template v-else>
        <TableMode
          :data="bookList"
          :trackingISBNs="trackingISBNs"
          @untrack="showConfirmModal"
          @track="trackBook"
        />
      </template>

      <button class="scroll_top" @click="scrollToTop">
        <img src="@/assets/chevron-up.png" alt="Scroll To Top" />
      </button>
    </template>

    <b-modal
      id="confirm-modal"
      :title="$t('book.untracked')"
      :ok-title="$t('modal.confirm')"
      :cancel-title="$t('modal.cancel')"
      hide-header-close
      no-close-on-backdrop
      @ok="untrackBook"
    >
      <template #default>
        {{ $t("modal.context") }}
      </template>
    </b-modal>
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
      "trackingISBNs",
      JSON.parse(localStorage.getItem("TenlongList")) || []
    );
  },
  data() {
    return {
      isGallery: true,
      untrackIndex: "",
    };
  },
  computed: {
    trackingISBNs() {
      return this.$store.getters["trackingISBNs"];
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
      this.$store.commit("trackingISBNs", [...this.trackingISBNs, book.ISBN]);
      console.log("trackBook: ", this.$store.getters["trackingISBNs"]);
      localStorage.setItem("TenlongList", JSON.stringify(this.trackingISBNs));
    },

    showConfirmModal(book) {
      this.untrackIndex = this.trackingISBNs.findIndex(
        (listISBN) => listISBN === book.ISBN
      );
      this.$bvModal.show("confirm-modal");
    },
    untrackBook() {
      // console.log("remove: ", this.untrackIndex);
      this.$store.commit("trackingISBNs", [
        ...this.trackingISBNs.slice(0, this.untrackIndex),
        ...this.trackingISBNs.slice(this.untrackIndex + 1),
      ]);
      localStorage.setItem("TenlongList", JSON.stringify(this.trackingISBNs));
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

  .scroll_top {
    padding: 10px 0;

    position: fixed;
    bottom: 10px;
    right: 10px;

    border: 3px solid #003f85;
    border-radius: 6px;
    background-color: white;

    &:focus {
      border: 3px solid #003f85;
    }
    &:hover > img {
      transform: rotate(0deg);
    }

    img {
      width: 50%;
      transition: transform 0.5s;
      transform: rotate(180deg);
    }
  }
}
</style>
