<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>
        <v-form action="#" @submit.prevent="login">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Phone Number" v-model="user.name" outlined>
              </v-text-field>
              <!-- end of v-text-field for phone number -->
              <v-text-field
                label="Password"
                type="password"
                v-model="user.password"
                outlined
              >
              </v-text-field>
              <!-- end of v-text-field for password -->

              <v-btn x-large type="submit" color="success" value="Sign up"
                >Login</v-btn
              >
            </v-col>
            <!-- end of v-col -->
          </v-row>
          <!-- end of v-row -->
        </v-form>
        <!-- end of v-form -->
      </v-card-text>
      <!-- end of v-card-text -->
    </v-card>
    <!-- end of v-card -->
  </v-container>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        name: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      window.alert("Login " + this.user.name + " - " + this.user.password);
    }
  }
};
</script>
