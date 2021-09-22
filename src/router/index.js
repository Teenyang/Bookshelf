import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import All from "@/views/All.vue";
import Discount30 from "@/views/Discount30.vue";
import Discount50 from "@/views/Discount50.vue";
import Ithelp from "@/views/Ithelp.vue";

import MemberPage from "@/components/MemberPage.vue";
import Profile from "@/views/Profile.vue";
import Collection from "@/views/Collection.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/all",
    name: "All",
    component: All,
  },
  {
    path: "/discount-30",
    name: "Discount30",
    component: Discount30,
  },
  {
    path: "/discount-50",
    name: "Discount50",
    component: Discount50,
  },
  {
    path: "/ithelp",
    name: "Ithelp",
    component: Ithelp,
  },
  {
    path: "/member",
    // redirect: "/member/profile",
    redirect: { name: "Profile" },
    component: MemberPage,
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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
