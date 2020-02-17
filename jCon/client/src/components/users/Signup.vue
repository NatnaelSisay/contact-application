<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" loading="true">
      <!-- add errors showing up here -->
      <v-card-title>
        Signup
      </v-card-title>

      <v-card-text>
        <v-form action="#" @submit.prevent="signup">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Your Name" v-model="user.name" outlined>
              </v-text-field>
              <!-- end of v-text-field for name -->

              <v-text-field
                label="Phone Number"
                v-model="user.phone_number"
                outlined
              >
              </v-text-field>
              <!-- end fo v-text-field for phone number -->
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
                <!-- end of v-col for password -->
                <v-col>
                  <v-text-field
                    label="Confirm Password"
                    v-model="user.confirm"
                    outlined
                    type="password"
                  >
                  </v-text-field>
                </v-col>
                <!-- end of v-col for confirm password -->
              </v-row>
              <!-- end of v-row for password conformation -->

              <v-file-input
                label="Upload Picture (optional)"
                v-model="user.photo"
                hint="(Optional)"
                ref="fileInput"
                style="display : none"
              >
              </v-file-input>
              <!-- end of v-file-input  -->
              <v-btn @click="$refs.fileInput.click()">Upload</v-btn>

              <v-btn x-large type="submit" color="success" value="Sign up"
                >Sign Up</v-btn
              >
            </v-col>
            <!-- end of v-cols -->
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
      errors: []
    };
  },
  methods: {
    signup() {
      window.alert(this.user.name);
    }
  }
};
</script>
