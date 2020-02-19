<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="500" loading="true">
      <!-- add errors showing up here -->
      <div v-if="errors">
        <v-alert type="error" v-for="error in errors" :key="error.id">
          {{ error }}
        </v-alert>
      </div>
      <v-card-title>
        Signup
      </v-card-title>

      <v-card-text>
        <ValidationObserver ref="observer" v-slot="{}">
          <v-form action="#" @submit.prevent="signup">
            <v-row>
              <v-col cols="12">
                <!-- upload a picture -->
                <v-layout class="d-flex justify-center mb-2">
                  <v-flex class="d-flex justify-center">
                    <div>
                      <input
                        type="file"
                        style="display : none"
                        ref="fileInput"
                        @change="avatarSelected"
                      />
                      <!-- end of v-file-input  -->

                      <v-avatar
                        @click="$refs.fileInput.click()"
                        raised
                        size="150"
                        class="img"
                      >
                        <img :src="avatar" alt="John" />
                      </v-avatar>
                      <!-- end of avatar -->
                    </div>
                    <!-- end of div, image container -->
                  </v-flex>
                </v-layout>
                <!-- end of v-layout, profile -->

                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    label="Your Email "
                    type="eamil"
                    v-model="user.email"
                    outlined
                    :error-messages="errors"
                  >
                  </v-text-field>
                  <!-- end of v-text-field for email -->
                </ValidationProvider>
                <!-- end of validation for Your email -->

                <ValidationProvider
                  rules="required|minStringLength"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="Your Name "
                    v-model="user.name"
                    outlined
                    :error-messages="errors"
                  >
                  </v-text-field>
                  <!-- end of v-text-field for email -->
                </ValidationProvider>
                <!-- end of validation for Your email -->

                <ValidationProvider
                  rules="required|ValidPhoneNumber"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="Phone Number"
                    v-model="user.phone_number"
                    outlined
                    :error-messages="errors"
                  >
                  </v-text-field>
                  <!-- end fo v-text-field for phone number -->
                </ValidationProvider>
                <!-- end of validationProvider for phone number -->

                <v-row>
                  <v-col>
                    <ValidationProvider
                      rules="required|Password"
                      v-slot="{ errors }"
                      name="password"
                    >
                      <v-text-field
                        label="Password"
                        v-model="user.password"
                        outlined
                        type="password"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <!-- end of v-col for password -->

                  <v-col>
                    <validation-provider
                      rules="required|confirm:@password"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Confirm Password"
                        v-model="user.confirm"
                        outlined
                        type="password"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>
                  </v-col>
                  <!-- end of v-col for confirm password -->
                </v-row>
                <!-- end of v-row for password conformation -->

                <!-- <v-file-input
                label="Upload Picture (optional)"
                v-model="user.photo"
                type="file"
                hint="(Optional)"
                ref="fileInput"
                style="display : none"
              >
              </v-file-input> -->
                <div class="d-flex justify-space-between">
                  <v-btn x-large type="submit" color="success" value="Sign up"
                    >Sign Up</v-btn
                  >

                  <v-btn
                    x-large
                    type="button"
                    @click="reset"
                    color="error"
                    value="Reset"
                    >Reset</v-btn
                  >
                </div>
              </v-col>

              <!-- end of v-cols -->
            </v-row>
            <!-- end of v-row -->
          </v-form>
          <!-- end of v-form -->
        </ValidationObserver>
        <!-- end of ValidationObserver -->
      </v-card-text>
      <!-- end of v-card-text -->
    </v-card>
    <!-- end of v-card -->
  </v-container>
</template>
<script>
// *********** FORM VALIDATION **********

import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider
} from "vee-validate";
// setInteractionMode,
// RULES
setInteractionMode("eager");
extend("minStringLength", value => {
  if (value.length < 4) {
    return "Name Shoud be Atlear 4 character long";
  }
  return true;
});
extend("required", {
  ...required,
  message: "* Required"
});
extend("email", {
  ...email,
  message: "* Email is not Valid"
});
extend("ValidPhoneNumber", value => {
  const tenCharacter = value.length == 10;
  const start_with_09 = value.slice(0, 2) == "09";
  if (tenCharacter && start_with_09) {
    return true;
  }
  return "* Not Valid Phone Number (eg, 0934343434)";
});

extend("Password", value => {
  if (value.length > 4) {
    return true;
  }
  return "* Password Need to be at leart 4 character long";
});
extend("confirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match"
});

// ******* end of form validation extends ********

// import axios from "axios";
export default {
  name: "signup",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        phone_number: null,
        password: null,
        confirm: null,
        photo: null
      },
      errors: [],
      avatar: "@/assets/logo.svg"
    };
  },
  created() {
    this.avatar = require("@/assets/avatar.png");
  },
  methods: {
    signup() {
      // window.alert(this.user.name);
      const value = this.$refs.observer.validate();
      value
        .then(resolve => {
          // here we will send the request to the server
          // console.log(" form Validated : " + resolve);
          // console.log(this.$refs.fileInput);

          if (resolve) {
            // dispatch reigster user
            const theUser = {
              name: this.user.name,
              phone_number: this.user.phone_number,
              photo: "no photo",
              realm: "novalue",
              username: this.user.name,
              email: this.user.email,
              emailVerified: true,
              password: this.user.password
            };

            this.$store
              .dispatch("register", {
                user: theUser,
                image: this.user.photo
              })
              .then(() => {
                this.$router.push("/login");
              })
              .catch(error => {
                // SIGNUP FAILED
                console.log(error);
              });
          } else {
            console.log("Form validation falied");
          }
        })
        .catch(err => {
          // FORM VALIDATION FAILED
          console.log(err);
        });
    },
    reset() {
      this.user.phone_number = this.user.name = this.user.password = this.user.confirm = this.user.photo = null;
      this.$refs.observer.reset();
    },
    avatarSelected(event) {
      // FIX ISSUE
      const selectedFile = event.target.files[0];
      this.avatar = URL.createObjectURL(selectedFile);
      this.photo = selectedFile;
      console.log(selectedFile);
    }
  }
};
</script>

<style scoped>
.mt-2 {
  margin-top: 2em !important;
}
.mb-2 {
  margin-bottom: 2em !important;
}
.m-2 {
  margin: 2em !important;
}
.img {
  /* padding: 1em; */
  border: 5px solid lightgreen;
  border-radius: 50%;
}
</style>
