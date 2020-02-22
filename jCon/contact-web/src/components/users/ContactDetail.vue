<template>
  <div>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-img class="black--text align-end" height="200px" :src="avatar">
        <v-card-title>{{ contact.name }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0">Additional Informations</v-card-subtitle>
      <v-card-text>
        <v-form action="#" @submit.prevent="save">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name"
                outlined
                v-model="contact.name"
                :disabled="!editable"
              >
              </v-text-field>
              <!-- end of v-text-field for phone number -->
              <v-text-field
                label="Password"
                v-model="contact.phone_number"
                :disabled="!editable"
                outlined
              >
              </v-text-field>
              <!-- end of v-text-field for password -->
              <div class="d-flex justify-space-between">
                <v-btn @click="edit" v-if="!editable">Edit</v-btn>
                <v-btn v-else @click="edit"> Cancel </v-btn>
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
        <!-- end of v-form -->
      </v-card-text>
      <!-- end of v-card-text -->
    </v-card>
  </div>

  <!-- end of v-card -->
</template>

<script>
export default {
  name: 'contactDetail',
  data() {
    return {
      contact: {},
      avatar: null,
      editable: false,
    };
  },
  created() {
    // this will call the state. and the result will be assigned here
    this.avatar = require('@/assets/avatar.png');
    this.$store
      .dispatch('getContactById', this.$router.history.current.params.id)
      .then(() => {
        this.contact = this.$store.getters.getDetail;
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
      // send user data, with id
      console.log('Edited contact data');
      console.log(this.contact);
      console.log('end of edited data');
    },
  },
};
</script>
