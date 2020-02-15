import Router from "vue-router";
import Vue from "vue";
import HomePage from "@/components/HomePage.vue";
import PageNotFound from "@/components/PageNotFound.vue";

// routes
import user_routes from "./users/index";
Vue.use(Router);

const allroutes = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "*",
    component: PageNotFound
  }
];
const routes = allroutes.concat(user_routes);
export default new Router({
  mode: "history",
  routes
  // allroutes
});
