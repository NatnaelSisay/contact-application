import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "@/router/index";
// import VeeValidate from "vee-validate";

Vue.use(router);
Vue.use(vuetify);
// Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
