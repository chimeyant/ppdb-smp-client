<template>
  <v-container>
    <v-row class="justify-content-center mt-10">
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-row class="justify-center">
          <img
            src="images/login.jpg"
            alt=""
            srcset=""
            width="60%"
            height="90%"
          >
        </v-row>
      </v-col>
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-col cols="12">

          <h2 class="mb-3">Login</h2>
          Silahkan masukan pengguna dan kata sandi anda

        </v-col>

        <v-col cols="12">
          <v-text-field
            :label="info.regby"
            outlined
            dense
            hide-details
            v-model="record.email"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            label="Kata Sandi"
            outlined
            dense
            hide-details
            type="password"
            v-model="record.password"
            v-on:keyup.enter="postAuthent"
          ></v-text-field>
        </v-col>

        <v-col col="12">
          <v-row class="justify-end  pa-2">
            <v-btn
              color="blue"
              @click="postAuthent"
              dark
            >
              Masuk
            </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "LoginComponent",
  data: () => ({
    record: {
      email: null,
      password: null,
    },
  }),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info", "http", "auth"]),
  },
  methods: {
    ...mapActions(["signIn", "clearMenu", "getMenus"]),
    postAuthent: function () {
      this.signIn({
        username: this.record.email.replace(/ /g, ""),
        userpass: this.record.password,
      }).then((pass) => {
        if (!pass) {
          console.clear();
          return;
        }
        try {
          this.clearMenu();
          this.getMenus();

          if (this.auth.user.user.authent == "administrator") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "supervisor") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "operator") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "guru") {
            this.$router.push({ name: "dashboard" });
          }

          if (this.auth.user.user.authent == "peserta") {
            this.$router.push({ name: "dashboard-peserta" });
          }
        } catch (error) {}
      });
    },
  },
};
</script>

<style>
</style>