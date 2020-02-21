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

    {{ the_phone }}
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
  computed: {
    the_phone: function() {
      // this.phone =
      return this.$router.history.current.params.phone_number;
      // return "this.$router.params.phone_number";
    }
  }
};
</script>
