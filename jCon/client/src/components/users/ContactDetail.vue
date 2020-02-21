<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="black--text align-end" height="200px" :src="avatar">
      <v-card-title>{{ contact.name }}</v-card-title>
    </v-img>
    <!-- end of v-img -->

    <v-card-subtitle class="pb-0">Additional Informations</v-card-subtitle>

    <v-card-text class="text--info" color="red--text">
      <div>Phone Number : {{ contact.phone_number }}</div>
    </v-card-text>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-card-title>
        {{ contact.name }}
      </v-card-title>

      <v-card-text>
        <v-form action="#" @submit.prevent="save">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name"
                type="email"
                outlined
                v-model="contact.name"
              >
              </v-text-field>
              <!-- end of v-text-field for phone number -->
              <v-text-field
                label="Phone"
                type="text"
                v-model="contact.phone_number"
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

    <!-- end of v-card-text -->

    <v-card-actions>
      <v-btn color="orange" text>
        Edit
      </v-btn>
    </v-card-actions>
    <!-- end of v-card-actions -->
  </v-card>
  <!-- end of v-card -->
</template>

<script>
export default {
  name: "contactDetail",
  data() {
    return {
      contact: {
        name: null,
        phoneNumber: null,
        photo: null
      },
      avatar: null
    };
  },
  created() {
    // this will call the state. and the result will be assigned here
    this.avatar = require("@/assets/avatar.png");
    this.$store
      .dispatch("getContactById", this.$router.history.current.params.id)
      .then(() => {
        this.contact = this.$store.getters.getDetail;
      });
  },
  methods: {
    save() {}
  },
  computed: {}
};
</script>
