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
              <v-text-field label="Name " outlined> </v-text-field>
              <v-text-field label="Phone Number" outlined> </v-text-field>

              <v-file-input label="Upload Picture (optional)" hint="(Optional)">
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
  name: "addUser"
};
</script>
