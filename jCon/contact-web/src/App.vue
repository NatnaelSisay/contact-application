<template>
  <v-app>
    <Navigation />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
        <!-- <h1 class="text-center">welcome</h1> -->
      </v-container>
    </v-content>
    <v-footer app></v-footer>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
      <v-btn dark text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navigation from '@/components/navigation/Navigation.vue';
export default {
  name: 'App',
  components: {
    Navigation,
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, error => {
      return new Promise(() => {
        if (error.status == 401 && error.config) {
          this.$store.dispatch('logout');
        }
        throw error;
      });
    });
  },
  computed: {
    snackbar: function() {
      return this.$store.getters.getSnackBar;
    },
  },
};
</script>
