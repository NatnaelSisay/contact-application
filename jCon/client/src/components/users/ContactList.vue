<template>
  <v-container>
    <v-card class="mx-auto">
      <v-list>
        <template>
          <v-subheader> Your Contact's </v-subheader>
        </template>

        <v-divider></v-divider>

        <v-list-item
          link
          v-for="contact in contacts"
          :key="contact.id"
          three-line=""
          :to="`/user/contacts/${contact.id}`"
        >
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img>
            <!-- {{ contact.picture }} -->
          </v-list-item-avatar>
          <!-- end of avatar -->

          <v-list-item-content>
            <v-list-item-title>{{ contact.name }}</v-list-item-title>
            <v-list-item-subtitle>{{
              contact.phone_number
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <!-- end of v-list-item-content -->
        </v-list-item>
        <!-- end of v-list-item -->
      </v-list>
      <!-- end of v-list -->
    </v-card>

    <v-btn
      class="mx-2"
      fab
      fixed
      bottom
      right
      dark
      color="indigo"
      to="/user/contacts/add"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: "contactList",
  data() {
    return {
      contact_list: null
    };
  },
  methods: {
    // add() {
    //   this.$router.push("/user/contacts/add");
    // }
  },
  created() {
    this.$store.dispatch("getContactList");
    this.contact_list = [
      {
        id: 1,
        name: "Ermias Amelga",
        phone_number: "0943445533",
        picture: "Photo"
      },
      {
        id: 2,
        name: "Ermias Amelga",
        phone_number: "0943445533",
        picture: "Photo"
      },
      {
        id: 3,
        name: "Ermias Amelga",
        phone_number: "0943445533",
        picture: "Photo"
      },
      {
        id: 4,
        name: "Ermias Amelga",
        phone_number: "0943445533",
        picture: "Photo"
      },
      {
        id: 5,
        name: "Ermias Amelga",
        phone_number: "0943445533",
        picture: "Photo"
      }
    ];
  },
  computed: {
    contacts: function() {
      // return them according to the names order
      return this.$store.getters.getContacts;
    }
  }
};
</script>
