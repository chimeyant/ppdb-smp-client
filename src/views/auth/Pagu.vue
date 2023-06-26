<template>
  <v-app
    id="inspire"
    light
  >
    <v-app-bar
      elevation="6"
      :class="theme + ` darken-1`"
      fixed
    >
      <v-app-bar-nav-icon>
        <img
          class="ml-10"
          :src="info.apps_logo"
          alt="Vuetify.js"
          height="48"
        />
      </v-app-bar-nav-icon>

      <v-toolbar-title
        :class="{ 'pl-2': device.mobile }"
        v-if="!device.mobile"
      >
        <span class="font-weight-bold pl-5 white--text">{{ info.company }}</span><br />
        <span class="text-xs pl-5 white--text">{{ info.slogan }}</span>
      </v-toolbar-title>

      <v-toolbar-title
        :class="{ 'pl-2': device.mobile }"
        v-if="device.mobile"
      >
        <span class="font-weight-bold pl-5 white--text">{{
          info.company
        }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="pr-5">
        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
          @click="$router.push({ name: 'home' })"
        >BERANDA</v-btn>

        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
          @click="$router.push({ name: 'pagu' })"
        >PAGU</v-btn>

        <v-btn
          text
          class="white--text"
          @click="$router.push({ name: 'pendaftar' })"
          v-show="device.desktop"
        >PENDAFTAR</v-btn>

        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
          @click="$router.push({ name: 'pengumuman' })"
        >PENGUMUMAN</v-btn>

        <v-btn
          text
          @click="$router.push({ name: 'login' })"
          class="white--text"
          v-show="device.desktop"
        >LOGIN</v-btn>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="device.mobile"
            color="white"
            icon
            light
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'home' })">
              Beranda
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'pagu' })">
              Pagu
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'formasi' })">
              Pendaftar
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'dokumen' })">
              Pengumuman
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'login' })">
              Login
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <section>
        <v-layout
          column
          wrap
          :class="`my-5 ` + theme + ` lighten-5 mt-16`"
          align-center
        >
          <v-flex
            xs12
            sm4
            class="my-3"
          >
            <div class="text-xs-center text-center">
              <h2 class="headline">PAGU JURUSAN</h2>
              <span class="subheading">
                Seluruh Pagu Jurusan Yang Tersedia.
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout
                row
                wrap
                align-center
              >
                _____
                <br />
                <br />
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <section>

        <v-row :class="device.desktop ? `content`:`content-mobile`">
          <v-col col="12">
            <v-card>
              <v-card-title :class="`flex flex-row-reverse ` + theme + ` lighten-1`">
                <v-tooltip
                  :color="theme + ` darken-4`"
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      text
                      small
                      icon
                      v-on="on"
                    >
                      <v-icon
                        color="white"
                        @click="fetchFormasi"
                      >refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh Data</span>
                </v-tooltip>

                <v-spacer></v-spacer>
                <v-col
                  :cols="device.desktop ? `4` : `10`"
                  class="pa-0"
                >
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Pencarian"
                    single-line
                    hide-details
                    solo
                    :color="theme"
                    dense
                  ></v-text-field>
                </v-col>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="records"
                :items-per-page="10"
                class="elevation-2"
                :color="theme"
                :loading="loading.table"
                loading-text="Loading... Please wait"
                :search="search"
              >
                <v-progress-linear
                  slot="progress"
                  :color="theme"
                  height="1"
                  indeterminate
                ></v-progress-linear>

                <template v-slot:item.status="{ value }">
                  <v-chip :color="
                      value == 'Pengajuan'
                        ? 'grey'
                        : value == 'Perbaikan Berkas'
                        ? 'red'
                        : value == 'Pengajuan Perbaikan'
                        ? 'yellow'
                        : 'green'
                    ">{{ value }}</v-chip>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-main>
    <section class="footer">
      <v-row class="pt-5 pl-10 pr-5">
        <v-col :cols="device.desktop ? `4` : `12`">
          <div class="title">
            SMK Negeri 4 Kabupaten Tangerang
          </div>
          <div class="address">
            Jl. Lingkar Luar Pasar Pinang
            <br>
            Kab. Tangerang - Provinsi Banten 15720
          </div>

        </v-col>
        <v-col :cols="device.desktop ? `4` : `12`"></v-col>
        <v-col :cols="device.desktop ? `4` : `12`">
          <div class="title">
            IKUTI KAMI
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-facebook</v-icon> Facebook
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-instagram</v-icon> Instagram
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-whatsapp</v-icon> Whatsapp
          </div>
        </v-col>
      </v-row>
      <v-layout
        column
        wrap
      >
        <v-flex class="pb-0 my-2 white--text align-center">
          <div class="copyright pl-10">
            SMK Negeri 4 Kab. Tangerang &copy; 2021 - 2022
          </div>
        </v-flex>
      </v-layout>
    </section>
    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="3500"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        text
        @click.stop="snackbarClose"
      >Tutup</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    headers: [
      { text: "#", value: "num", width: 50 },
      { text: "JURUSAN", value: "nama" },

      { text: "WARNA MAP", value: "warna" },
      { text: "PAGU/KUOTA", value: "pagu" },
      { text: "PENDAFTAR", value: "pendaftar" },
    ],
    records: [],
    uname: "",
    upass: "",
    visible: false,
    color: "purple darken-3",
    jmlformasi: 0,
    jmlpelamar: 0,
    search: null,
  }),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        window.document.title = this.info.company;
        const favicon = window.document.getElementById("favicon");
        favicon.href = this.info.apps_logo;
      });
      this.fetchFormasi();
    });
  },
  computed: {
    ...mapState([
      "device",
      "info",
      "snackbar",
      "device",
      "http",
      "loading",
      "theme",
    ]),

    contentStyle: function () {
      if (!this.device.mobile && this.info.apps_background) {
        return `background: url(${this.info.apps_background});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;`;
      }
      return ``;
    },
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", "signIn", "snackbarClose"]),
    postAuthent: function () {
      this.signIn({
        username: this.uname.replace(/ /g, ""),
        userpass: this.upass,
      }).then((pass) => {
        if (!pass) {
          console.clear();
          return;
        }
        try {
          this.$router.push({ name: "dashboard" });
        } catch (error) {}
      });
    },
    postRegister: function () {
      this.$router.push({ name: "register" });
    },
    fetchFormasi: async function () {
      let { data } = await this.http.get("pagu");

      this.records = data;
    },
    fetchDashboard: async function () {
      let {
        data: { jmlformasi, jmlpelamar },
      } = await this.http.get("api/dashboard-index");
      this.jmlformasi = jmlformasi;
      this.jmlpelamar = jmlpelamar;
    },
  },
};
</script>

<style lang="sass">
@import '../../sass/card'
@import '../../sass/moui.sass'
@import '../../sass/textField.sass'
</style>
