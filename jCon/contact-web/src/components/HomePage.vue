<template>
  <v-container>
    <h1 class="text-center" v-if="!userLoggedIn">
      Welcome To jCon Contact Application
    </h1>
    <h1 class="text-center" v-else>
      HI! :)
      {{ this.$store.getters.getLoggedUser.name }}
    </h1>
  </v-container>
</template>
<script>
export default {
  name: 'HomePage',

  data() {
    return {};
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
