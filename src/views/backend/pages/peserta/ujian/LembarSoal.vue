<template>
  <v-container
    fluid
    class="pt-0 grid-list-xl"
  >
    <v-row class="pa-1">
      <v-col class="stats-widget-v3">
        <v-card class="mx-auto my-10">
          <v-toolbar
            color="blue darken-3"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>LEMBAR SOAL</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon @click="fetchSoalDetail">refresh<span class="material-icons"> </span></v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="sheet = true">keyboard<span class="material-icons"></span></v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title>{{ soal.ujian }}</v-card-title>
          <v-row
            align="center"
            class="mx-0"
          >
            <div class="grey--text ml-4 h4">{{ soal.jumlah_soal }} Soal</div>
            <div class="grey--text ml-4 h4">
              Waktu Pengerjaan : {{ soal.waktu }} Menit
            </div>
            <v-spacer></v-spacer>
            <div :class="device.mobile ? `grey--text ml-4` : `grey--text mr-4`">
              Waktu:
              <v-chip
                small
                color="green"
              >{{ soal.jam_mulai }}</v-chip> s.d
              <v-chip
                color="red"
                small
              >{{ soal.jam_selesai }}</v-chip>
            </div>
            <div :class="device.mobile ? `grey--text ml-4` : `grey--text mr-4`">
              Jam : <v-chip
                color="blue"
                small
              >{{ jamview }}</v-chip>
            </div>
            <div :class="device.mobile ? `grey--text ml-4` : `grey--text mr-4`">
              Sisa Waktu :
              <v-chip
                color="yellow"
                small
              >{{ timeleft }} Menit</v-chip>
            </div>
          </v-row>
          <hr class="mt-5" />
          <v-card-text>
            <v-row>
              <tbody class="mt-5 ml-5 mb-5 mr-10">
                <tr>
                  <td style="vertical-align: top">
                    <v-chip color="grey">{{ butirsoal.nomor }}</v-chip>
                  </td>
                  <td styles="vertical-align: top">
                    <div
                      class="pa-2"
                      v-html="butirsoal.soal"
                    ></div>

                    <div v-show="butirsoal.soal_gambar">
                      <v-col cols="12">
                        <img
                          :src="butirsoal.soal_gambar_path"
                          alt=""
                          :width="device.desktop ? `100%` : `275px`"
                        />
                      </v-col>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-row>
            <v-row>
              <tbody class="mt-3 ml-15 mb-5 mr-10">
                <tr>
                  <td style="vertical-align: top">
                    <v-chip
                      :color="butirsoal.jawaban == 'A' ? `red` : `grey`"
                      @click="postJawaban('A')"
                    >A</v-chip>
                  </td>
                  <td>
                    <div
                      class="pa-2"
                      v-html="butirsoal.pilihan_a"
                    ></div>
                    <div v-show="butirsoal.pilihan_a_gambar">
                      <img
                        :src="butirsoal.pilihan_a_gambar_path"
                        alt=""
                        :width="device.desktop ? `100%` : `250px`"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align: top">
                    <v-chip
                      :color="butirsoal.jawaban == 'B' ? `red` : `grey`"
                      @click="postJawaban('B')"
                    >B</v-chip>
                  </td>
                  <td>
                    <div
                      class="pa-2"
                      v-html="butirsoal.pilihan_b"
                    ></div>
                    <div v-show="butirsoal.pilihan_b_gambar">
                      <img
                        :src="butirsoal.pilihan_b_gambar_path"
                        alt=""
                        :width="device.desktop ? `100%` : `250px`"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align: top">
                    <v-chip
                      :color="butirsoal.jawaban == 'C' ? `red` : `grey`"
                      @click="postJawaban('C')"
                    >C</v-chip>
                  </td>
                  <td>
                    <div
                      class="pa-2"
                      v-html="butirsoal.pilihan_c"
                    ></div>
                    <div v-show="butirsoal.pilihan_c_gambar">
                      <img
                        :src="butirsoal.pilihan_c_gambar_path"
                        alt=""
                        :width="device.desktop ? `100%` : `250px`"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align: top">
                    <v-chip
                      :color="butirsoal.jawaban == 'D' ? `red` : `grey`"
                      @click="postJawaban('D')"
                    >D</v-chip>
                  </td>
                  <td>
                    <div
                      class="pa-2"
                      v-html="butirsoal.pilihan_d"
                    ></div>
                    <div v-show="butirsoal.pilihan_d_gambar">
                      <img
                        :src="butirsoal.pilihan_d_gambar_path"
                        alt=""
                        :width="device.desktop ? `100%` : `250px`"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="vertical-align: top">
                    <v-chip
                      :color="butirsoal.jawaban == 'E' ? `red` : `grey`"
                      @click="postJawaban('E')"
                    >E</v-chip>
                  </td>
                  <td>
                    <div
                      class="pa-2"
                      v-html="butirsoal.pilihan_e"
                    ></div>
                    <div v-show="butirsoal.pilihan_e_gambar">
                      <img
                        :src="butirsoal.pilihan_e_gambar_path"
                        alt=""
                        :width="device.desktop ? `100%` : `250px`"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-row>
          </v-card-text>
          <v-card-actions class="">
            <v-spacer> </v-spacer>
            <v-btn
              outlined
              color="red "
              :small="device.mobile"
              @click="prev"
              v-show="nomor != 1"
            >
              <v-icon>arrow_left</v-icon> Sebelumnya
            </v-btn>

            <v-btn
              color="green "
              outlined
              @click="next"
              :small="device.mobile"
              v-show="nomor < soal.jumlah_soal"
            >
              Berikutnya <v-icon>arrow_right</v-icon>
            </v-btn>
            <v-btn
              outlined
              color="blue "
              @click="postConfirm"
              :small="device.mobile"
              v-show="soal.jumlah_soal == nomor"
            >
              <v-icon>stop</v-icon> Selesai
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-bottom-sheet
        v-model="sheet"
        max-width="400"
        inset
      >
        <v-sheet class="text-center">
          <v-container
            fluid
            class="pt-0 grid-list-xl"
          >
            <div class="subtitle-1 text-h6 grey--text mb-3">
              LOMPAT KE SOAL :
            </div>
            <v-row>
              <v-col
                cols="3"
                v-for="item in soal.jumlah_soal"
                :key="item"
              >
                <v-chip
                  color="green"
                  class="text-center"
                  @click="fetchSoalTo(item)"
                >{{ item }}</v-chip>
              </v-col>
            </v-row>
            <v-btn
              class="mt-6"
              color="error"
              @click="sheet = !sheet"
            >
              Tutup
            </v-btn>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Sekolah",

  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num" },
      {
        text: "TINGKAT",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "KETERANGAN", value: "description" },
      { text: "OPSI", value: "id" },
    ],

    search: null,

    soal: {
      id: null,
      mapel: null,
      keterangan: null,
    },

    butirsoal: {
      id: null,
      nomor: null,
      soal: null,
    },

    nomor: 1,
    sheet: false,
    jamview: "00:00:00",

    timeleft: null,
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "record",
      "records",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
    });

    this.soal.id = this.$route.params.id;
    this.butirsoal.nomor = 1;

    this.fetchInfoSoal();
    this.fetchSoalDetail();

    setInterval(this.jam, 1000);
    this.fetchTimeLeft();
    setInterval(this.setTimeLeft, 60000);
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "fetchRecords", "setLoading"]),

    fetchInfoSoal: async function () {
      try {
        let { data: data } = await this.http.post(
          "api/peserta/fetch-info-soal",
          {
            jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
          }
        );

        this.soal = data;
      } catch (error) {
        this.soal = {
          mapel: "",
          keterangan: "",
        };

        this.snackbar.color = "red";
        this.snackbar.text = "Opps.., jaringan sedang sibuk";
        this.snackbar.state = true;
      }
    },

    fetchSoalDetail: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses buka soal..",
        });
        let { data: data } = await this.http.post("api/peserta/fetch-soal", {
          jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
          nomor: this.nomor,
        });

        this.butirsoal = data;
      } catch (error) {
        this.butirsoal = {
          soal: null,
          pilihan_a: null,
          pilihan_b: null,
          pilihan_c: null,
          pilihan_d: null,
          pilihan_e: null,
        };
      } finally {
        this.setLoading({
          dialog: false,
          text: "Proses buka soal...",
        });
      }
    },

    fetchTimeLeft: async function () {
      let {
        data: { time_left },
      } = await this.http.post("api/peserta/get-time-left", {
        jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
      });

      this.timeleft = time_left;
    },
    setTimeLeft: async function () {
      try {
        let { data } = await this.http.post("api/peserta/set-time-left", {
          jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
          timeleft: this.timeleft,
        });
        this.timeleft = data;
      } catch (error) {}
    },

    fetchSoalTo: async function (val) {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses buka soal",
        });

        this.nomor = val;

        let { data } = await this.http.post("api/peserta/fetch-soal", {
          jadwal_ujian_id: this.$route.params.jadwal_ujian_id,
          nomor: this.nomor,
        });

        this.butirsoal = data;
        this.sheet = false;
      } catch (error) {
        this.butirsoal = {};
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },
    next: function () {
      this.nomor =
        this.soal.jumlah_soal > this.nomor ? this.nomor + 1 : this.nomor;
      this.fetchSoalDetail();
    },
    prev: function () {
      this.nomor = this.nomor > 1 ? this.nomor - 1 : this.nomor;
      this.fetchSoalDetail();
    },

    postJawaban: async function (val) {
      try {
        this.setLoading({
          dialog: true,
          text: "Sedang Mengirim Jawaban",
        });
        let {
          data: { status, exp, jawaban, message },
        } = await this.http.post("api/peserta/store-jawaban", {
          id: this.butirsoal.id,
          pilihan: val,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        if (exp) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          this.postConfirm();
        }

        this.butirsoal.jawaban = jawaban;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Silahkan Ulang Kembali";
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    postConfirm: async function () {
      this.$router.push({
        name: "konfirmasi-selesai-ujian",
        params: { jadwal_ujian_id: this.$route.params.jadwal_ujian_id },
      });
    },

    jam: function () {
      var time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();

      this.jamview = hours + ":" + minutes + ":" + seconds;
    },
  },
};
</script>
