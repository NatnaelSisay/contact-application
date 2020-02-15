<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" loading="true">
      <v-card-title>
        Signup
      </v-card-title>

      <v-card-text>
        <v-form action="#">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Phone Number" outlined> </v-text-field>
              <v-row>
                <v-col>
                  <v-text-field label="Password" outlined> </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Confirm Password" outlined>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-file-input label="Upload Picture (optional)" hint="(Optional)">
              </v-file-input>

              <v-btn x-large type="submit" color="success" value="Sign up"
                >Sign Up</v-btn
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
  name: "signup"
};
</script>
