<template>
  <v-app>
    <v-navigation-drawer app dark v-model="drawer">
      <v-list dense nav class="py-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Information
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/user/editProfile">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Java</v-list-item-title>
            <v-list-item-subtitle>0949632242</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/user/editProfile">
          <v-list-item-title>Edir Profile</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- end of navigation drawer -->

    <v-app-bar app dark color="green">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title to="/">CONTACT</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn text color="" to="/">Home</v-btn>
        <v-btn text color="" to="/user/signup">Signup</v-btn>
        <v-btn text to="/user/login">Login</v-btn>

        <v-btn text to="/user/contacts">Contact List</v-btn>
        <v-btn text to="/user/contacts/12">Contact Detail</v-btn>
        <!-- <v-btn text to="/user/login">Login</v-btn>
				<v-btn text to="/user/login">Login</v-btn> -->

        <!-- if logged in user -->
        <v-btn text to="/user/logout">Logout</v-btn>
      </v-toolbar-items>

      <!-- mobile -->
      <v-menu class="hidden-md-and-up">
        <!-- make the button for mobile work -->

        <v-btn>button</v-btn>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
        <!-- <h1 class="text-center">welcome</h1> -->
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false // Hide mobile side menu by default
    };
  }
};
</script>
