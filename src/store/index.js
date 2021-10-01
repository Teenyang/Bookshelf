import Vue from "vue";
import Vuex from "vuex";

import { GET } from "@/utilities/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookList: {},
  },
  getters: {
    allBooks: (state) => state.bookList.list,
    discountBooks: (state, getters) => (min, max) =>
      getters.allBooks.filter(
        (book) =>
          min <= book.sellPrice / book.originPrice &&
          book.sellPrice / book.originPrice < max
      ),

    discount30Books: (state, getters) => getters.discountBooks(0.7, 0.8),
    discount50Books: (state, getters) => getters.discountBooks(0.5, 0.6),
    ithelpBook: (state, getters) =>
      getters["allBooks"].filter((book) => book.name.includes("鐵人賽")),

    // discount30Books: (state) =>
    //   state.bookList.list.filter(
    //     (book) =>
    //       0.7 <= book.sellPrice / book.originPrice &&
    //       book.sellPrice / book.originPrice < 0.8
    //   ),
    // discount50Books: (state) =>
    //   state.bookList.list.filter(
    //     (book) =>
    //       0.5 <= book.sellPrice / book.originPrice &&
    //       book.sellPrice / book.originPrice < 0.6
    //   ),
    // ithelpBook: (state) =>
    //   state.bookList.list.filter((book) => book.name.includes("鐵人賽")),
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
