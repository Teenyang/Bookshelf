import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

import Home from "@/views/Home.vue";
import List from "@/views/List.vue";
// import All from "@/views/All.vue";
// import Ithelp from "@/views/Ithelp.vue";
// import Tracking from "@/views/Tracking.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      store.dispatch("fetchBookList");
      next();
    },
  },
  {
    path: "/list/:nav",
    name: "List",
    component: List,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("fetchBookList");
      next();
    },
  },
  // {
  //   path: "/book",
  //   redirect: { name: "All" },
  //   component: List,
  //   children: [
  //     {
  //       path: "all",
  //       name: "All",
  //       component: All,
  //     },
  //     {
  //       path: "ithelp",
  //       name: "Ithelp",
  //       component: Ithelp,
  //     },
  //     {
  //       path: "tracking",
  //       name: "Tracking",
  //       component: Tracking,
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

export default router;
