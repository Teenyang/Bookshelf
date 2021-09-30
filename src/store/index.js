import Vue from "vue";
import Vuex from "vuex";

import { GET } from "@/utilities/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookList: {},
  },
  getters: {
    books: (state) => state.bookList,
    bookList: (state) => state.bookList.list,
    bookDiscount30: (state) =>
      state.bookList.list.filter(
        (book) =>
          0.7 <= book.sellPrice / book.originPrice &&
          book.sellPrice / book.originPrice < 0.8
      ),
    bookDiscount50: (state) =>
      state.bookList.list.filter(
        (book) =>
          0.5 <= book.sellPrice / book.originPrice &&
          book.sellPrice / book.originPrice < 0.6
      ),
    bookIthelp: (state) =>
      state.bookList.list.filter((book) => book.name.includes("鐵人賽")),
  },
  mutations: {
    bookList(state, books) {
      state.bookList = books;
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
