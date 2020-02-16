<template>
  <v-container>
    <v-card class="mx-auto" raised max-width="700" outlined>
      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>
        <v-form action="#">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Phone Number" outlined> </v-text-field>
              <v-text-field label="Password" outlined> </v-text-field>

              <v-btn x-large type="submit" color="success" value="Sign up"
                >Login</v-btn
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
  name: "login"
};
</script>
