<template>
  <v-container>
    <h1>logout</h1>
  </v-container>
</template>
<script>
export default {
  name: "logout",
  created() {
    localStorage.removeItem("access_token");
    this.$router.push("/");
    // destroy the token and redirect to home page
  }
};
</script>
