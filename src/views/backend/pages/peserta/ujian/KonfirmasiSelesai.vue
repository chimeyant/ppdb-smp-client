<template>
  <v-container fluid class="pt-0 grid-list-xl">
    <v-flex row class="pl-3 pb-2 pt-5"> </v-flex>
    <v-row class="pa-1">
      <v-col class="stats-widget-v3">
        <v-card class="mx-auto" max-width="500">
          <v-toolbar :color="theme" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>KONFIRMASI UJIAN SELESAI</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card class="mx-auto overflow-y-auto" max-width="500">
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-card-title>{{ peserta.nomor_register }}</v-card-title>
                  <v-card-subtitle class="mt-o justify-content-between"
                    >{{ peserta.nama }}
                    <br />
                    {{ peserta.nisn }}
                  </v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <div class="mt-10 title">
                <center v-show="konfirmasi">
                  Apakah Anda yakin telah menyelesaikan ujian ini..?
                </center>
                <center v-show="!konfirmasi">
                  {{ pesan }}
                </center>
              </div>
              <br />
              <v-row class="justify-center mt-10 mb-10">
                <v-btn class="mr-2" @click="$router.go(-1)">BATAL</v-btn>

                <v-btn
                  v-show="!lanjut"
                  :color="theme"
                  class="ml-2"
                  @click="postSelesai"
                  >YA, SETUJU</v-btn
                >
              </v-row>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Sekolah",

  data: () => ({
    peserta: {},
    pesans: [],
    formasis: [],
    dialog: false,
    from_id: null,
    record: {
      title: null,
      body: null,
    },
    search: null,
    jmlpegawai: 25,

    selected: [2],

    jadwals: [],

    konfirmasi: true,
    lanjut: false,
    pesan: null,
  }),

  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "loading",
      "event",
      "page",
      "snackbar",
      "info",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/dashboard",
    });

    this.getAppInfo();
    this.fetchDashboard();
    this.fetchJadwalUjian();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "getAppInfo", "setLoading"]),

    fetchDashboard: async function () {
      let {
        data: { peserta, pesans },
      } = await this.http.get("api/peserta/dashboard");

      this.peserta = peserta;
      this.pesans = pesans;
    },

    fetchJadwalUjian: async function () {
      try {
        let { data } = await this.http.post(
          "api/peserta/dashboard-jadwal-ujian"
        );

        this.jadwals = data;
      } catch (error) {}
    },
    postCreateSoals: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses pembuatan soal ujian",
        });
        let {
          data: { status, lanjut, message },
        } = await this.http.post("api/peserta/create-soals", {
          jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
        });

        if (!status) {
          this.konfirmasi = false;
          this.pesan = "Silah shkan ulang beberapa saat";
        }

        if (!lanjut) {
          this.konfirmasi = false;
          this.pesan = message;
          this.lanjut = lanjut;
        }

        this.lanjut = lanjut;
        this.konfirmasi = false;
        this.pesan = message;
      } catch (error) {
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },
    postSelesai: async function () {
      try {
        let {
          data: { status, message },
        } = await this.http.post("api/peserta/konfirmasi-selesai", {
          jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.$router.push({ name: "dashboard-peserta" });
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },
    postLembarSoal: function () {
      this.$router.push({
        name: "lembar-soal",
        params: { jadwal_ujian_id: this.$route.params.jadwal_ujian_id },
      });
    },
  },
};
</script>
