<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://randomuser.me/api/portraits/men/81.jpg"
    >
      <v-card-title>{{ contact.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Additional Informations</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Phone Number : 0923422332</div>

      <!-- <div></div> -->
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "user Detail",
  data() {
    return {
      contact: {
        name: "Ermias Amelga"
      }
    };
  }
};
</script>
