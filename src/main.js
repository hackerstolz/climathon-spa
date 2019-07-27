import "babel-polyfill";
import Vue from "vue";
import Vuetify from "vuetify";
import VueScrollTo from "vue-scrollto";
import App from "./App.vue";
import "./registerServiceWorker";
import { i18n } from "./i18n";

// register plug-ins
Vue.use(VueScrollTo);
Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    primary: "#10182F",
    secondary: "#182445",
    accent: "#A8E5A3",
    error: "#DD543B",
    info: "#70B4DF",
    success: "#4CAE79",
    warning: "#FFC533"
  }
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");

// enable hot update for i18n files
if (module.hot) {
  module.hot.accept(["./locales/en.json", "./locales/de.json"], function() {
    i18n.setLocaleMessage("en", require("@/locales/en.json"));
    i18n.setLocaleMessage("de", require("@/locales/de.json"));
  });
}
