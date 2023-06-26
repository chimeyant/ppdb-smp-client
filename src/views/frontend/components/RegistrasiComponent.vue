<template>
  <v-container>
    <v-row class="mt-10">
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-row class="justify-center">
          <img
            src="../../../assets/images/REGISTRASI PESERTA.png"
            alt=""
            srcset=""
            width="60%"
            height="90%"
          >
        </v-row>
      </v-col>
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-col cols="12">
          <h2 class="mb-3">Registrasi Peserta</h2>
          Sebelum melakukan pendaftaran di sistem ppdb {{ info.company }}, silahkan lakukan registrasi akun terlebih dahulu

        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Nama Lengkap"
            outlined
            dense
            hide-details
            v-model="record.username"
          ></v-text-field>
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
            label="Nomor HP (WhatsApp)"
            outlined
            type="number"
            placeholder="cth: 081280007656"
            dense
            hide-details
            v-model="record.telepon"
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
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Kata Sandi Ulang"
            outlined
            dense
            hide-details
            type="password"
            v-model="record.password_confirm"
          ></v-text-field>
        </v-col>
        <v-col col="12">
          <v-row class="justify-end  pa-2">
            <v-btn
              color="blue"
              @click="postSignUp"
              dark
            >
              <v-icon class="mr-2">mdi-send</v-icon>Kirim
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
  name: "RegistarsiComponent",
  data: () => ({
    record: {
      username: null,
      email: null,
      userpass: null,
      repass: null,
      telepon: null,
    },
    diabled: false,
  }),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info", "http"]),
  },
  methods: {
    ...mapActions(["signUp", ""]),
    postSignUp: function () {
      this.signUp({
        username: this.record.username,
        email: this.record.email,
        userpass: this.record.password,
        repass: this.record.password_confirm,
        telepon: this.record.telepon,
      }).then((pass) => {
        if (!pass) {
          console.clear();
          return;
        } else {
          this.$router.push({ name: "login" });
        }
      });
    },
  },
  watch: {},
};
</script>

<style>
</style>