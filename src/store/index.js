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
    allBooks: (state) => state.bookList.list ?? [], // 若前者為undefined，則回傳後者
    ithelpBook: (state, getters) =>
      getters["allBooks"].filter((book) => book.name.includes("鐵人賽")),
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
