import Router from "vue-router";
import Vue from "vue";
import HomePage from "@/components/HomePage.vue";
import PageNotFound from "@/components/PageNotFound.vue";
Vue.use(Router);

const routes = [
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

export default new Router({
  mode: "history",
  routes
});
