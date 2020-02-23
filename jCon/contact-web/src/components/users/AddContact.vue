<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-card-title>
        Add Contact
      </v-card-title>

      <!-- avatar -->
      <v-layout class="d-flex justify-center">
        <div>
          <input
            type="file"
            style="display : none"
            ref="fileInput"
            @change="avatarSelected"
          />
          <v-avatar @click="$refs.fileInput.click()" size="150">
            <img :src="avatar" :alt="contact.name" class="img" />
          </v-avatar>
        </div>
      </v-layout>
      <!-- end of avatar -->

      <v-card-text>
        <ValidationObserver ref="observer" v-slot="{}">
          <v-form action="#" @submit.prevent="newContact">
            <v-row>
              <v-col cols="12">
                <ValidationProvider
                  name="name"
                  rules="required|alpha_dash"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="Contact Name"
                    outlined
                    v-model="contact.name"
                    :error-messages="errors"
                  >
                  </v-text-field>
                </ValidationProvider>
                <!-- end of v-text-field for phone number -->
                <ValidationProvider
                  name="phone"
                  rules="required|ValidPhoneNumber"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="Phone Number"
                    v-model="contact.phone"
                    outlined
                    :error-messages="errors"
                  >
                  </v-text-field>
                </ValidationProvider>
                <!-- end of v-text-field for password -->

                <v-btn x-large type="submit" color="success" value="Save"
                  >Save</v-btn
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
// ************* FORM VALIDATION **********

// RULES AND MODULES - from vuetify-official doc
import { required, alpha_dash } from 'vee-validate/dist/rules';
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
setInteractionMode('eager');

// CUSTOM RULES
extend('required', {
  ...required,
  message: '* Required',
});
extend('alpha_dash', {
  ...alpha_dash,
  message: '* Special Character Not allowed (eg, abebe)',
});
extend('ValidPhoneNumber', value => {
  const tenCharacter = value.length == 10;
  const start_with_09 = value.slice(0, 2) == '09';
  if (tenCharacter && start_with_09) {
    return true;
  }
  return '* Not Valid Phone Number (eg, 0934343434)';
});

// ************* FORM VALIDATION **********

export default {
  name: 'login',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      contact: {
        name: null,
        phone: null,
        owner: null,
        photo: 'avatar',
      },
      avatar: null,
    };
  },
  created() {
    this.avatar = require('@/assets/avatar.png');
  },
  methods: {
    newContact() {
      /**
       * newContact :-> will add Valid contact to the database
       *
       * retrun :-> nothing, but will redirect to contact list based on success
       *
       */

      const isFormValidated = this.$refs.observer.validate();

      isFormValidated
        .then(isFormValid => {
          // ****** FORM VALIDATED *****
          if (isFormValid) {
            // ****** DATA CLEANING ****
            const contactInfo = {};
            contactInfo.name = this.contact.name;
            contactInfo.phone_number = this.contact.phone;
            contactInfo.ownerId = this.$store.getters.getOwnerId;
            contactInfo.photo = this.contact.photo;

            this.$store
              .dispatch('addContact', contactInfo)
              .then(() => {
                //  *************[ SUCCESS ] NOTIFICATION NEW USER IS SUCCESFYLLY ADDED *******

                this.$router.push('/user/contacts');

                //  ************* NOTIFICATION NEW USER IS SUCCESFYLLY ADDED *******
              })
              .catch(() => {
                //  *************[ ERROR ] NOTIFICATION NEW USER WAS NOT ADDED *******
                //  *************[ ERROR ] NOTIFICATION NEW USER WAS NOT ADDED *******
              });
          }
        })
        .catch(() => {
          // *********** [ ERROR ] FORM NOT VALID *******
        });
    },
    avatarSelected(event) {
      /**
       * avatarSelected :-> will give us the selected avatar and assign for preview
       *
       * return :-> no return value
       * modifies, this.avatar , this.contact.photo datas
       */
      const selectedFile = event.target.files[0];
      this.avatar = URL.createObjectURL(selectedFile);
      this.contact.photo = selectedFile;
      // console.log(selectedFile);
    },
    reset() {
      this.$refs.observer.reset();
    },
  },
};
</script>
<style scoped>
.img {
  /* padding: 1em; */
  border: 5px solid lightgreen;
  border-radius: 50%;
}
</style>
