<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-card-title>
        Add Contact
      </v-card-title>

      <v-card-text>
        <v-form action="#" @submit.prevent="newContact">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Contact Name"
                outlined
                v-model="contact.name"
              >
              </v-text-field>
              <!-- end of v-text-field for phone number -->
              <v-text-field
                label="Phone Number"
                v-model="contact.phone"
                outlined
              >
              </v-text-field>
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
      </v-card-text>
      <!-- end of v-card-text -->
    </v-card>
    <!-- end of v-card -->
  </v-container>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      contact: {
        name: null,
        phone: null,
        owner: null,
        photo: null
      }
    };
  },
  methods: {
    newContact() {
      alert("contact");
      const user = {};
      user.name = this.contact.name;
      user.phone_number = this.contact.phone;
      user.photo = "";
      user.owner = "natyjava8@gmail.com";
      console.log(user);

      // when i try to send the data, it say it is not valid.
      // when i print out it says it is observer, to i changed it
      this.$store
        .dispatch("addContact", user)
        .then(() => {
          this.$router.go();
        })
        .catch(error => {
          // LOGIN filed
          console.log(error);
        });
    }
  }
};
</script>
