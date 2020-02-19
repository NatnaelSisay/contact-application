<template>
  <v-container fluid>
    <v-navigation-drawer app dark v-model="drawer">
      <v-list dense nav class="py-0" v-if="isLoggedIn">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Information
            </v-list-item-title>
            <!-- end of v-list-title -->
          </v-list-item-content>
        </v-list-item>
        <!-- end of v-list-item -->

        <v-list-item link to="/user/editProfile">
          <v-list-item-avatar>
            <img :src="user.photo" />
          </v-list-item-avatar>
          <!-- end of avatart -->

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.phone_number }}</v-list-item-subtitle>
          </v-list-item-content>
          <!-- end of v-list-item-content -->
        </v-list-item>
        <!-- end of v-list-item -->

        <v-list-item link to="/user/editProfile">
          <v-list-item-title>Edir Profile</v-list-item-title>
        </v-list-item>
        <!-- end fo v-list-item -->
      </v-list>
      <!-- end of v-list, v-if logged in -->

      <v-list v-else>
        <v-list-item link to="login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- end of v-list , v-else logged out-->
    </v-navigation-drawer>
    <!-- end of navigation drawer -->

    <v-app-bar app dark color="green">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title to="/">CONTACT</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down" v-if="isLoggedIn">
        <v-btn text color="" to="/">Home</v-btn>
        <v-btn text to="/user/contacts">Contact List</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </v-toolbar-items>
      <!-- end of v-toolbar-items -->

      <v-toolbar-items class="hidden-md-and-down" v-else>
        <v-btn text color="" to="/">Home</v-btn>
        <v-btn text color="" to="/signup">Signup</v-btn>
        <v-btn text to="/login">Login</v-btn>
      </v-toolbar-items>
      <!-- end of v-toolbat-items -->

      <!-- mobile -->
      <v-menu class="hidden-md-and-up">
        <!-- make the button for mobile work -->

        <v-btn>button</v-btn>
      </v-menu>
      <!-- end of v-menu -->
    </v-app-bar>
    <!-- end of v-app-bar -->
  </v-container>
  <!-- end of v-container -->
</template>

<script>
export default {
  name: "navigation-panel",
  data() {
    return {
      drawer: false, // Hide mobile side menu by default
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
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch(error => {
          console.log("[ ERROR ] logout, token may be expired");
          console.log(error);
        });
    }
  }
};
</script>
