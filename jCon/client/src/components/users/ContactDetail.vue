<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" :src="contact.photo">
      <v-card-title>{{ contact.name }}</v-card-title>
    </v-img>
    <!-- end of v-img -->

    <v-card-subtitle class="pb-0">Additional Informations</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Phone Number : {{ contact.phoneNumber }}</div>
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
      phone: null
    };
  },
  created() {
    // this will call the state. and the result will be assigned here
    this.$store
      .dispatch(
        "getContactById",
        this.$router.history.current.params.phone_number
      )
      .then(() => {
        this.contact = this.$store.getters.getDetail;
        this.contact.photo =
          "data:image/jpeg;base64,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";
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
