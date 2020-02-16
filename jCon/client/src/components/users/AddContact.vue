<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" loading="true">
      <v-card-title>
        Add New contact
      </v-card-title>

      <v-card-text>
        <v-form action="#">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name " v-model="contact_info.name" outlined>
              </v-text-field>
              <v-text-field
                label="Phone Number"
                v-model="contact_info.phoneNumber"
                outlined
              >
              </v-text-field>

              <v-file-input
                label="Upload Picture (optional)"
                v-model="contact_info.photo"
                hint="(Optional)"
              >
              </v-file-input>

              <v-btn x-large type="submit" color="success" value="Sign up"
                >Save</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "addContact",
  data() {
    return {
      contact_info: {
        name: null,
        phoneNumber: null,
        photo: null
      }
    };
  }
};
</script>
