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
                :disabled="true"
              />
              <v-avatar @click="$refs.fileInput.click()" size="250">
                <img
                  v-if="user.photo == 'avatar'"
                  :src="avatar"
                  :alt="user.name"
                  class="img"
                />
                <img v-else :src="user.photo" :alt="user.name" class="img" />
              </v-avatar>
            </div>
          </v-layout>
          <!-- end of avatar -->
        </v-col>
        <!-- end of image section -->

        <!-- detail section -->
        <v-col cols="6">
          <v-card-title>{{ user.name }}</v-card-title>

          <v-card-subtitle class="pb-0">User Information</v-card-subtitle>
          <v-card-text>
            <v-form action="#" disabled>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    outlined
                    v-model="user.name"
                    :disabled="true"
                  >
                  </v-text-field>

                  <!-- end of v-text-field for phone number -->

                  <v-text-field
                    label="Phone Number"
                    v-model="user.phone_number"
                    :disabled="true"
                    outlined
                  >
                  </v-text-field>

                  <v-text-field
                    label="Email"
                    v-model="user.email"
                    :disabled="true"
                    outlined
                  >
                  </v-text-field>

                  <!-- end of v-text-field for password -->
                </v-col>
                <!-- end of v-col -->
              </v-row>
              <!-- end of v-row -->
            </v-form>
            <v-btn @click="logout"> logout</v-btn>
            <!-- end of v-form -->
          </v-card-text>
        </v-col>
      </v-row>

      <!-- end of v-card-text -->

      <!-- end of v-card-actions -->
    </v-card>
    <!-- end of v-card -->
  </div>
</template>

<script>
export default {
  name: 'userDetail',
  data() {
    return {
      user: {
        name: null,
        phoneNumber: null,
        photo: null,
      },
    };
  },
  created() {
    // this will call the state. and the result will be assigned here
    this.user = this.$store.getters.getLoggedUser;
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login');
      });
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
