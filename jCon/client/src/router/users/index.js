// src/routes/users/index.js

import UserPage from "@/components/users/UserPage.vue";
import Signup from "@/components/users/Signup.vue";
import Login from "@/components/users/Login.vue";
import LogOut from "@/components/users/LogOut.vue";
import UserDetail from "@/components/users/UserDetail.vue";
import ContactList from "@/components/users/ContactList.vue";
import ContactDetail from "@/components/users/ContactDetail.vue";

const routes = [
  {
    path: "/user",
    component: UserPage,
    children: [
      {
        path: "signup",
        component: Signup
      },
      {
        path: "login",
        component: Login
      },
      {
        path: "logout",
        component: LogOut
      },
      {
        path: "detail",
        component: UserDetail
      },
      {
        path: "contacts",
        component: ContactList
      },
      {
        path: "contacts/:phone_number",
        component: ContactDetail
      },
      {
        path: "*",
        redirect: "/user/signup"
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
