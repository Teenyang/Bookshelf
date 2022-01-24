import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index.js";

import MainPage from "@/components/MainPage.vue";
import All from "@/views/All.vue";
import Ithelp from "@/views/Ithelp.vue";

import MemberPage from "@/components/MemberPage.vue";
import Profile from "@/views/Profile.vue";
import Collection from "@/views/Collection.vue";
import Purchase from "@/views/Purchase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("fetchBookList");
      next();
    },
  },
  {
    path: "/book",
    redirect: { name: "All" },
    component: MainPage,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("fetchBookList");
      next();
    },
    children: [
      {
        path: "all",
        name: "All",
        component: All,
      },
      {
        path: "ithelp",
        name: "Ithelp",
        component: Ithelp,
      },
    ],
  },
  {
    path: "/member",
    // redirect: "/member/profile",
    redirect: { name: "Profile" },
    component: MemberPage,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("fetchBookList");
      next();
    },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "collection",
        name: "Collection",
        component: Collection,
      },
      {
        path: "collection/purchase/:bookName",
        name: "Purchase",
        component: Purchase,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

// router.beforeEach(async (to, from, next) => {
//   await store.dispatch("fetchBookList");
//   next();
// });

export default router;
