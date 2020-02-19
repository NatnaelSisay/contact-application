import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "@/router/index";
import store from "@/store/index";

// ******* Authentication ******
import axios from "axios";
Vue.prototype.$http = axios;
const token = localStorage.getItem("access_token");
if (token) {
  // Request can be made if authorization is required
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
// ******************************

Vue.use(router);
Vue.use(vuetify);
Vue.use(store);
// Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
