<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <FooterComponent />
    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="3500"
      multi-line
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="theme"
          text
          v-bind="attrs"
          @click="snackbarClose"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "./components/Header.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "base",
  components: {
    Header,
    FooterComponent,
  },
  data: () => ({}),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        this.getAppInfo().then(() => {
          window.document.title = this.info.company;
          const favicon = window.document.getElementById("favicon");
          favicon.href = this.info.apps_logo;
        });
      });
    });
  },
  computed: {
    ...mapState(["device", "theme", "info", "snackbar"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "snackbarClose"]),
  },
  watch: {},
};
</script>

<style>
</style>