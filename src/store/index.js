import Vue from "vue";
import Vuex from "vuex";

import { GET } from "@/utilities/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookList: {},
    trackingISBNs: [],
  },
  getters: {
    trackingISBNs: (state) => state.trackingISBNs,
    trackingList: (state, getters) =>
      getters.trackingISBNs.map((trackingISBN) =>
        getters.allBooks.find((book) => book.ISBN === trackingISBN)
      ),

    allBooks: (state, getters) =>
      state.bookList.list.map((book) => {
        return {
          ...book,
          isTracking: getters.trackingISBNs.some(
            (trackingISBN) => trackingISBN === book.ISBN
          ),
        };
      }) ?? [], // 若前者為undefined，則回傳後者

    ithelpBook: (state, getters) =>
      getters["allBooks"].filter((book) => book.name.includes("鐵人賽")),
  },
  mutations: {
    bookList(state, books) {
      state.bookList = books;
    },
    trackingISBNs(state, books) {
      state.trackingISBNs = books;
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
