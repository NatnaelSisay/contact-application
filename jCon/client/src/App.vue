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
  </v-app>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>
