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
  name: 'login',
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
    newContact() {},
    avatarSelected(event) {
      // FIX ISSUE
      const selectedFile = event.target.files[0];
      this.avatar = URL.createObjectURL(selectedFile);
      this.contact.photo = selectedFile;
      console.log(selectedFile);
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
