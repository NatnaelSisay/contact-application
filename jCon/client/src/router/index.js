// @/router/index.js

import Router from "vue-router";
import Vue from "vue";

// components
import HomePage from "@/components/HomePage.vue";
import PageNotFound from "@/components/PageNotFound.vue";
import Signup from "@/components/users/Signup.vue";
import Login from "@/components/users/Login.vue";
import LogOut from "@/components/users/LogOut.vue";

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
    path: "/signup",
    component: Signup
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/logout",
    component: LogOut
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
});
