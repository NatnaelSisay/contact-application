<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>
        <ValidationObserver ref="observer">
          <v-form action="#" @submit.prevent="login">
            <v-row>
              <v-col cols="12">
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    label="Email"
                    type="email"
                    outlined
                    v-model="user.email"
                    :error-messages="errors"
                  >
                  </v-text-field>
                </ValidationProvider>
                <!-- end of v-text-field for phone number -->

                <ValidationProvider
                  rules="required|Password"
                  v-slot="{ errors }"
                  name="password"
                >
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="user.password"
                    :error-messages="errors"
                    outlined
                  >
                  </v-text-field>
                </ValidationProvider>
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
        </ValidationObserver>
      </v-card-text>
      <!-- end of v-card-text -->
    </v-card>
    <!-- end of v-card -->
  </v-container>
</template>
<script>
// *********** FORM VALIDATION **********

import { required, email } from 'vee-validate/dist/rules';
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
// setInteractionMode,
// RULES
setInteractionMode('eager');

extend('required', {
  ...required,
  message: '* Required',
});
extend('email', {
  ...email,
  message: '* Email is not Valid',
});

extend('Password', value => {
  if (value.length > 4) {
    return true;
  }
  return '* Password error';
});

// ******* end of form validation extends ********

export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      const isFormValidated = this.$refs.observer.validate();

      isFormValidated.then(isFormValid => {
        if (isFormValid) {
          this.$store
            .dispatch('login', this.user)
            .then(() => {
              // ***** [ SUCCESS ] LOGGED IN SUCCESSFULLY *****
              this.$router.push('/');
            })
            .catch(() => {
              // **** [ ERROR ] NOTIFICATION EMAIL OR PASSWORD MAY BE WRONG ***
              // console.log(error);
            });
        }
      });
    },
  },
};
</script>
