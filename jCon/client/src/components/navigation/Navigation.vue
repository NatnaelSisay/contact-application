<template>
  <v-container fluid>
    <v-navigation-drawer app dark v-model="drawer">
      <v-list dense nav class="py-0" v-if="loggedIn">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Information
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/user/editProfile">
          <v-list-item-avatar>
            <img :src="user.photo" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.phone_number }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/user/editProfile">
          <v-list-item-title>Edir Profile</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item link to="/user/login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- end of navigation drawer -->

    <v-app-bar app dark color="green">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title to="/">CONTACT</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down" v-if="loggedIn">
        <v-btn text color="" to="/">Home</v-btn>
        <v-btn text to="/user/contacts">Contact List</v-btn>
        <v-btn text to="/user/logout" @click="log">Logout</v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-md-and-down" v-else>
        <v-btn text color="" to="/">Home</v-btn>
        <v-btn text color="" to="/user/signup">Signup</v-btn>
        <v-btn text to="/user/login" @click="log">Login</v-btn>
      </v-toolbar-items>

      <!-- mobile -->
      <v-menu class="hidden-md-and-up">
        <!-- make the button for mobile work -->

        <v-btn>button</v-btn>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "navigatoin",
  data() {
    return {
      drawer: false, // Hide mobile side menu by default
      loggedIn: false,
      user: {}
    };
  },
  created() {
    // the logged in should be put in put to the state, so we could getch it from there
    this.user = {
      name: "Java",
      phone_number: "0949632242",
      photo: "https://randomuser.me/api/portraits/men/81.jpg"
    };
  },
  computed: {
    isLoggedIn() {
      return true;
    }
  },
  methods: {
    log() {
      this.loggedIn = !this.loggedIn;
    }
  }
};
</script>
