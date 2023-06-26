<template>
  <v-container fluid class="pt-0 grid-list-xl">
    <v-row class="pa-1">
      <v-col class="stats-widget-v3">
        <v-card class="mx-auto my-10">
          <v-toolbar color="blue darken-3" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>LEMBAR SOAL</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon @click="fetchSoal"
                >refresh<span class="material-icons"> </span
              ></v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon @click="sheet = true"
                >keyboard_alt<span class="material-icons"> </span
              ></v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title>MATA PELAJARAN</v-card-title>
          <v-row align="center" class="mx-0">
            <div class="grey--text ml-4 h4">{{ soal.mapel }}</div>
            <div class="grey--text ml-4 h4">{{ soal.jumlah }} Soal</div>
            <v-spacer></v-spacer>
            <div :class="device.mobile ? `grey--text ml-4` : `grey--text mr-4`">
              Waktu:
              <v-chip small color="green">{{ soal.jam_mulai }}</v-chip> s.d
              <v-chip color="red" small>{{ soal.jam_selesai }}</v-chip>
            </div>
            <div :class="device.mobile ? `grey--text ml-4` : `grey--text mr-4`">
              Jam : <v-chip color="blue" small></v-chip>
            </div>
            <div :class="device.mobile ? `grey--text ml-4` : `grey--text mr-4`">
              Sisa Waktu :
              <v-chip color="yellow" small> Menit</v-chip>
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
                    <div class="pa-2" v-html="butirsoal.soal"></div>

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
                    <v-chip color="grey">A</v-chip>
                  </td>
                  <td>
                    <div class="pa-2" v-html="butirsoal.pilihan_a"></div>
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
                    <v-chip color="grey">B</v-chip>
                  </td>
                  <td>
                    <div class="pa-2" v-html="butirsoal.pilihan_b"></div>
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
                    <v-chip color="grey">C</v-chip>
                  </td>
                  <td>
                    <div class="pa-2" v-html="butirsoal.pilihan_c"></div>
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
                    <v-chip color="grey">D</v-chip>
                  </td>
                  <td>
                    <div class="pa-2" v-html="butirsoal.pilihan_d"></div>
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
                    <v-chip color="grey">E</v-chip>
                  </td>
                  <td>
                    <div class="pa-2" v-html="butirsoal.pilihan_e"></div>
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
              v-show="nomor < soal.jumlah"
            >
              Berikutnya <v-icon>arrow_right</v-icon>
            </v-btn>
            <v-btn
              outlined
              color="blue "
              @click="$router.push({ name: 'ujian-master-soal' })"
              :small="device.mobile"
              v-show="soal.jumlah == nomor"
            >
              <v-icon>stop</v-icon> Selesai
            </v-btn>
          </v-card-actions>
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

    //this.fetchInfoSoal();
    //this.fetchSoal();
    //this.fetchTimeLeft();
    //setInterval(this.jam, 1000);
    //setInterval(this.setTimeLeft, 60000);
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "fetchRecords"]),

    fetchInfoSoal: async function () {
      try {
        let { data: data } = await this.http.post("api/master-soal-info", {
          id: this.soal.id,
        });

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
        let { data: data } = await this.http.post(
          "api/master-soal-detail-info",
          {
            master_soal_id: this.soal.id,
            nomor: this.nomor,
          }
        );

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
      }
    },

    fetchTimeLeft: async function () {
      let {
        data: { time_left },
      } = await this.http.post("api-v2/get-time-left", {
        ujian_id: this.$route.params.ujian_id,
      });

      this.timeleft = time_left;
    },
    setTimeLeft: async function () {
      try {
        let { data } = await this.http.post("api-v2/set-time-left", {
          ujian_id: this.$route.params.ujian_id,
        });
        this.timeleft = data;
      } catch (error) {}
    },
    fetchSoal: async function () {
      try {
        this.loading = true;
        let { data } = await this.http.post("api-v2/get-soal", {
          ujian_id: this.$route.params.ujian_id,
          nomor: this.nomor,
        });

        this.soal = data;
        this.loading = false;
      } catch (error) {
        this.soal = {};
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    fetchSoalTo: async function (val) {
      try {
        this.loading = true;

        this.nomor = val;

        let { data } = await this.http.post("api-v2/get-soal", {
          ujian_id: this.$route.params.ujian_id,
          nomor: this.nomor,
        });

        this.soal = data;
        this.sheet = false;
      } catch (error) {
        this.soal = {};
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    next: function () {
      this.nomor = this.soal.jumlah > this.nomor ? this.nomor + 1 : this.nomor;
      this.fetchSoalDetail();
    },
    prev: function () {
      this.nomor = this.nomor > 1 ? this.nomor - 1 : this.nomor;
      this.fetchSoalDetail();
    },

    postJawaban: async function (val) {
      try {
        this.loading = true;
        let {
          data: { status, message },
        } = await this.http.post("api-v2/store-jawaban", {
          id: this.soal.ujian_soal_id,
          pilihan: val,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;

          return;
        }

        this.fetchSoal();
      } catch (error) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    postConfirm: async function () {
      this.$router.push({
        name: "konfirmasi-selesai",
        params: { ujian_id: this.$route.params.ujian_id },
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
