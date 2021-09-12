import Vue from "vue";

// import BootstrapVue from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

// Vue.use(BootstrapVue);

import "@/assets/scss/_bootstrapVue.scss";
import { NavbarPlugin } from "bootstrap-vue";
Vue.use(NavbarPlugin);

import { FormInputPlugin } from "bootstrap-vue";
Vue.use(FormInputPlugin);

import { BButton } from "bootstrap-vue";
Vue.component("b-button", BButton);
