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
import store from "../store";
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
const router = new Router({
  mode: "history",
  routes
});

// ********** AUTHENTICATION *********
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

// ********************************

export default router;
