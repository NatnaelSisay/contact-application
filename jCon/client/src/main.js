import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "@/router/index";

Vue.use(router);
// import "vuetify/dist/vuetify.min.css";
Vue.use(vuetify);
// Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
