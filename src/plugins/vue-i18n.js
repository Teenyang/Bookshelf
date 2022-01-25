import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "@/locales/en";
import zh from "@/locales/zh";

Vue.use(VueI18n);

export default new VueI18n({
  // locale: process.env.VUE_APP_I18N_LOCALE || 'zh',
  locale: localStorage.getItem("locale") || "zh", // 重新整理仍為所選語系
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: {
    zh: zh,
    en: en,
  },
});
