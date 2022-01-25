import Vue from "vue";

// import BootstrapVue from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

// Vue.use(BootstrapVue);

import "@/assets/scss/vendors/_bootstrap-vue.scss";
import {
  NavbarPlugin,
  FormInputPlugin,
  LayoutPlugin,
  TablePlugin,
  IconsPlugin,
  ModalPlugin,
  BButton,
} from "bootstrap-vue";
Vue.use(NavbarPlugin);
Vue.use(FormInputPlugin);
Vue.use(LayoutPlugin);
Vue.use(TablePlugin);
Vue.use(ModalPlugin);
Vue.use(IconsPlugin);
Vue.component("b-button", BButton);
