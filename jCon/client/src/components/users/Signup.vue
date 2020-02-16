<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" loading="true">
      <!-- add errors showing up here -->
      <div v-if="errors">
        <v-alert type="error" v-for="error in errors" :key="error.id">
          {{ error }}
        </v-alert>
      </div>
      <div v-if="success">
        <v-alert type="success">
          {{ success }}
        </v-alert>
      </div>
      <v-card-title>
        Signup
      </v-card-title>

      <v-card-text>
        <v-form action="#" @submit.prevent="signup">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Your Name" v-model="user.name" outlined>
              </v-text-field>
              <v-text-field
                label="Phone Number"
                v-model="user.phone_number"
                outlined
              >
              </v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Password"
                    v-model="user.password"
                    outlined
                    type="password"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Confirm Password"
                    v-model="user.confirm"
                    outlined
                    type="password"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-file-input
                label="Upload Picture (optional)"
                v-model="user.photo"
                hint="(Optional)"
              >
              </v-file-input>

              <v-btn x-large type="submit" color="success" value="Sign up"
                >Sign Up</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "signup",
  data() {
    return {
      user: {
        name: null,
        phone_number: null,
        password: null,
        confirm: null,
        photo: null
      },
      errors: [],
      success: "Successfully Signed up"
    };
  },
  methods: {
    signup() {
      window.alert(this.user.name);
    }
  }
};
</script>
