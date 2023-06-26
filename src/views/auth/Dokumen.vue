<template>
  <v-app id="inspire" light>
    <v-app-bar elevation="6" :class="theme + ` darken-1`" fixed>
      <v-app-bar-nav-icon>
        <img class="ml-10" :src="info.apps_logo" alt="Vuetify.js" height="48"
      /></v-app-bar-nav-icon>

      <v-toolbar-title :class="{ 'pl-2': device.mobile }" v-if="!device.mobile">
        <span class="font-weight-bold pl-5 white--text">{{ info.company }}</span
        ><br />
        <span class="text-xs pl-5 white--text">{{ info.slogan }}</span>
      </v-toolbar-title>

      <v-toolbar-title :class="{ 'pl-2': device.mobile }" v-if="device.mobile">
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
          >BERANDA</v-btn
        >

        <v-btn
          text
          class="white--text"
          v-show="device.desktop && info.pagu"
          @click="$router.push({ name: 'pagu' })"
          >PAGU</v-btn
        >

        <v-btn
          text
          class="white--text"
          @click="$router.push({ name: 'formasi' })"
          v-show="device.desktop"
          >PENDAFTAR</v-btn
        >

        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
          @click="$router.push({ name: 'dokumen' })"
          >PENGUMUMAN</v-btn
        >

        <v-btn
          text
          @click="$router.push({ name: 'login' })"
          class="white--text"
          v-show="device.desktop"
          >LOGIN</v-btn
        >
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
            <v-list-item-title
              v-show="info.pagu"
              @click="$router.push({ name: 'pagu' })"
            >
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
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center text-center">
              <h2 class="headline">PENGUMUAN PPDB 2021/2022</h2>
              <span class="subheading">
                Dengan Rahmat Tuhan Yang Maha Esa, Berikut daftar nama peserta
                PPDB yang di terima di {{ info.company }}
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                _____
                <br />
                <br />
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <section>
        <v-row class="pa-5">
          <v-col col="12">
            <v-card>
              <v-card-title
                :class="`flex flex-row-reverse ` + theme + ` lighten-1`"
              >
                <v-tooltip :color="theme + ` darken-4`" bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn text small icon v-on="on">
                      <v-icon color="white" @click="fetchRecords"
                        >refresh</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>Refresh Data</span>
                </v-tooltip>

                <v-spacer></v-spacer>
                <v-col :cols="device.desktop ? `4` : `10`" class="pa-0">
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
                  <v-chip
                    :color="
                      value == 'Pengajuan'
                        ? 'grey'
                        : value == 'Perbaikan Berkas'
                        ? 'yellow'
                        : value == 'Pengajuan Perbaikan'
                        ? 'yellow'
                        : value == 'Berkas Diterima'
                        ? 'green'
                        : 'red'
                    "
                    >{{ value }}</v-chip
                  >
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-main>
    <section :class="theme + ` lighten-5`">
      <v-layout column wrap :class="theme + ` darken-1 pb-0`">
        <v-flex class="pb-0 my-2 white--text align-center">
          <div class="subtitle-1 text-center">
            {{ info.company }}<br />

            Team ICT &copy; 2021
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
      <v-btn dark text @click.stop="snackbarClose">Tutup</v-btn>
    </v-snackbar>
    <div class="text-center">
      <v-dialog v-model="loading.dialog" persistent width="300">
        <v-card :color="theme" dark>
          <v-card-text class="pa-2">
            {{ loading.text }}
            <br />
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    headers: [
      { text: "#", value: "num" },
      { text: "NISN", value: "nisn" },
      { text: "NAMA", value: "nama" },
      { text: "L/P", value: "jeniskelamin" },
      { text: "ASAL SEKOLAH", value: "sekolah" },
      { text: "JURUSAN", value: "jurusan" },
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
      this.fetchRecords();
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
    ...mapActions([
      "setPage",
      "getAppInfo",
      "signIn",
      "snackbarClose",
      "setLoading",
    ]),
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
    fetchRecords: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Membuka Data Pendaftar",
        });
        let { data } = await this.http.get("pengumuman");

        this.records = data;
      } catch (error) {
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
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
