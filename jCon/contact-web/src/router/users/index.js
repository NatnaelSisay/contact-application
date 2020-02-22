// @/routes/users/index.js

import UserPage from "@/components/users/UserPage.vue";
import UserDetail from "@/components/users/UserDetail.vue";
import ContactList from "@/components/users/ContactList.vue";
import ContactDetail from "@/components/users/ContactDetail.vue";
import AddContact from "@/components/users/AddContact.vue";

const routes = [
  {
    path: "/user",
    component: UserPage,
    children: [
      {
        path: "editProfile",
        component: UserDetail
      },
      {
        path: "contacts",
        component: ContactList
      },
      {
        path: "contacts/add",
        component: AddContact
      },
      {
        path: "contacts/:id",
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
