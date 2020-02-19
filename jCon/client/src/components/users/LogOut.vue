<template>
  <v-container>
    <h1>logout</h1>
  </v-container>
</template>
<script>
export default {
  name: "logout",
  created() {
    // destroy the token and redirect to home page
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("logged_in");
    localStorage.removeItem("user");
    this.$router.push("/");
  }
};
</script>
