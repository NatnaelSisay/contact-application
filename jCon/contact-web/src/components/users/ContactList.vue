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
            <img v-if="contact.photo == 'avatar'" :src="avatar" />
            <img v-else :src="contact.photo" />
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
  name: 'contactList',
  data() {
    return {
      contact_list: null,
      avatar: null,
    };
  },
  methods: {
    // add() {
    //   this.$router.push("/user/contacts/add");
    // }
  },
  created() {
    this.avatar = require('@/assets/avatar.png');
    this.$store.dispatch('getContactList');
  },
  computed: {
    contacts: function() {
      // Give sorted Contact list
      let cont = this.$store.getters.getContacts;
      function compare(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      }

      return cont.sort(compare);
    },
  },
};
</script>
