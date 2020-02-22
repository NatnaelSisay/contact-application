<template>
  <div>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-row>
        <!-- image section -->
        <v-col cols="6">
          <!-- avatar -->
          <v-layout class="d-flex justify-center m-1">
            <div>
              <input
                type="file"
                style="display : none"
                ref="fileInput"
                :disabled="!editable"
                @change="avatarSelected"
              />
              <v-avatar @click="$refs.fileInput.click()" size="250">
                <img
                  v-if="contact.photo == 'avatar'"
                  :src="avatar"
                  :alt="contact.name"
                  class="img"
                />
                <img
                  v-else
                  :src="currentProfile"
                  :alt="contact.name"
                  class="img"
                />
              </v-avatar>
            </div>
          </v-layout>
          <!-- end of avatar -->
        </v-col>
        <!-- end of image section -->

        <!-- detail section -->
        <v-col cols="6">
          <v-card-title>{{ contact.name }}</v-card-title>

          <v-card-subtitle class="pb-0"
            >Additional Informations</v-card-subtitle
          >
          <v-card-text>
            <ValidationObserver ref="observer" v-slot="{}">
              <v-form action="#" @submit.prevent="save">
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      name="name"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Name"
                        outlined
                        v-model="contact.name"
                        :disabled="!editable"
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
                        v-model="contact.phone_number"
                        :disabled="!editable"
                        :error-messages="errors"
                        outlined
                      >
                      </v-text-field>
                    </ValidationProvider>
                    <!-- end of v-text-field for password -->
                    <div class="d-flex justify-space-between">
                      <v-btn @click="edit" v-if="!editable">Edit</v-btn>
                      <v-btn v-else @click="edit"> Cancel </v-btn>
                      <v-btn
                        text
                        type="button"
                        color="danger"
                        v-if="editable"
                        @click="reset"
                        value="reset"
                        >Reset</v-btn
                      >
                      <v-btn
                        text
                        type="submit"
                        color="success"
                        v-if="editable"
                        value="Save"
                        >Save</v-btn
                      >
                    </div>
                  </v-col>
                  <!-- end of v-col -->
                </v-row>
                <!-- end of v-row -->
              </v-form>
            </ValidationObserver>
            <!-- end of v-form -->
          </v-card-text>
        </v-col>
      </v-row>

      <!-- end of v-card-text -->
    </v-card>
  </div>

  <!-- end of v-card -->
</template>

<script>
// ************* FORM VALIDATION ********
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
  name: 'contactDetail',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      contact: {},
      avatar: null,
      currentProfile: '',
      editable: false,
    };
  },
  created() {
    this.avatar = require('@/assets/avatar.png');

    // GET USER BY THEIR id from DB
    // The id is sent with the router link, with name id
    this.$store
      .dispatch('getContactById', this.$router.history.current.params.id)
      .then(contactInfo => {
        this.contact = contactInfo;
        this.currentProfile = this.contact.photo;
        // console.log('RESPONSE FROM SERVER');
        // console.log(this.contact);
      })
      .catch(() => {
        // ****** [ ERROR ] CONTACT CAN'T BE RETRIVED *****
      });
  },
  computed: {
    the_phone: function() {
      // this.phone =
      return this.$router.history.current.params.phone_number;
      // return "this.$router.params.phone_number";
    },
  },

  methods: {
    edit() {
      this.editable = !this.editable;
    },
    save() {
      // ****** Save ***

      // check form validation
      const isFormValidated = this.$refs.observer.validate();

      isFormValidated.then(isValidated => {
        if (isValidated) {
          // ******* FORM VALIDATED ******

          // the change we need to see is for the picture
          // if a user choose diffrent picture, we need to upload the picture again
          // if the user don't change the picture, then we only need to send the files again

          // ****** DATA CLEANUP *******
          const contactInfo = {};
          contactInfo.name = this.contact.name;
          contactInfo.phone_number = this.contact.phone_number;
          contactInfo.id = this.contact.id;
          contactInfo.photo = this.contact.photo;
          contactInfo.ownerId = this.contact.ownerId;

          // ****** DATA CLEANUP *******

          if (typeof contactInfo.photo == 'string') {
            // ********** user haven't changed the picture. ******
            // console.log('client');
            // console.log(this.contact);
            this.$store
              .dispatch('normalEditContact', contactInfo)
              .then(() => {
                // ********** [ SUCCESS ] NOTIFICATION CONTACT HAS BEEN UPDATED *******

                this.$router.push('/user/contacts');

                // ********** [ SUCCESS ] CONTACT HAS BEEN UPDATED *******
              })
              .catch(() => {
                // ********* [ ERROR ] NOTIFICATION CONTACT CAN'T BE UPDATED **********
                // ********* [ ERROR ] NOTIFICATION CONTACT CAN'T BE UPDATED **********
              });
          } else {
            this.$store
              .dispatch('profileChangedContact', contactInfo)
              .then(() => {
                // ******* [ SUCCESS ] NOTIFICAITON CONTACT MODIFIED ******

                this.$router.push('/user/contacts');

                // ******* [ SUCCESS ] NOTIFICAITON CONTACT MODIFIED ******
              })
              .catch(() => {
                // ****** [ ERROR ] NOT MODIFIED
              });
            // console.log('profile selected');
          }
        }
      });
    },
    avatarSelected() {
      /**
       * avatarSelected :-> will give us the selected avatar and assign for preview
       *
       * return :-> no return value
       * modifies, this.avatar , this.contact.photo datas
       */
      const selectedFile = event.target.files[0];
      this.currentProfile = URL.createObjectURL(selectedFile);
      this.contact.photo = selectedFile;
    },

    reset() {
      // ***** reloading the page will remove the unsaved datas
      this.$router.go();
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
.m-1 {
  margin: 1em !important;
}
</style>
