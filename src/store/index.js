import Vue from "vue";
import Vuex from "vuex";

import { GET } from "@/utilities/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookList: {},
  },
  getters: {
    bookList: (state) => state.bookList.list,
  },
  mutations: {
    bookList(state, books) {
      state.bookList = books;
    },
  },
  actions: {
    async fetchBookList(context) {
      const books = await GET();
      // console.log(books);
      context.commit("bookList", books);
    },
  },
  modules: {},
});
