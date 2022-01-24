import Vue from "vue";
import Vuex from "vuex";

import { GET } from "@/utilities/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookList: {},
    trackingList: [],
  },
  getters: {
    allBooks: (state) => state.bookList.list,
    discountBooks: (state, getters) => (min, max) =>
      getters.allBooks.filter(
        (book) =>
          min <= book.sellPrice / book.originPrice &&
          book.sellPrice / book.originPrice < max
      ),

    ithelpBook: (state, getters) =>
      getters["allBooks"].filter((book) => book.name.includes("鐵人賽")),

    // ithelpBook: (state) =>
    //   state.bookList.list.filter((book) => book.name.includes("鐵人賽")),

    trackingList: (state) => state.trackingList,
  },
  mutations: {
    bookList(state, books) {
      state.bookList = books;
    },
    trackingList(state, books) {
      state.trackingList = books;
    },
  },
  actions: {
    async fetchBookList(context) {
      const books = await GET();
      context.commit("bookList", books);
    },
  },
  modules: {},
});
