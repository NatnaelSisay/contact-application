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
              <v-text-field
                label="Email "
                type="email"
                v-model="user.email"
                outlined
              >
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
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      // window.alert("Login " + this.user.name + " - " + this.user.password);
      axios
        .post("http://localhost:3000/api/Owners/login", this.user)
        .then(resolve => {
          console.log(resolve.data.id);
          localStorage.setItem("access_token", resolve.data.id);
          this.$router.push("/user/contacts");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
