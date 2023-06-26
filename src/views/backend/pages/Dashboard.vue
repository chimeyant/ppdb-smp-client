<template>
  <v-container
    fluid
    class="pt-0 grid-list-xl"
  >
    <v-flex
      row
      class="pl-3 pb-2 pt-5"
    >
      <v-icon :color="theme">dashboard</v-icon>
      <v-subheader class="text-h6"> DASHBOARD </v-subheader>
    </v-flex>
    <!--
    <v-row class="pa-1">
      <v-col class="stats-widget-v3">
        <v-row>
          <v-col :cols="device.desktop ?`4`:`12`">
            <v-card
              class="mx-auto"
              max-width="300"
            >
              <v-toolbar
                :color="theme"
                dark
              >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title class="white--text">Per Jenis Kelamin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card
                class="mx-auto overflow-y-auto"
                height="300"
                max-width="300"
              >
                <v-col cols="12">
                  <per-jenis-kelamin />
                </v-col>
              </v-card>
            </v-card>
          </v-col>
          <v-col :cols="device.desktop ?`4`:`12`">
            <v-card
              class="mx-auto"
              max-width="300"
            >
              <v-toolbar
                :color="theme"
                dark
              >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title class="white--text">Per Jurusan</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card
                class="mx-auto overflow-y-auto"
                height="300"
                max-width="300"
              >
                <v-col cols="12">
                  <per-jurusan />
                </v-col>
              </v-card>
            </v-card>
          </v-col>
          <v-col :cols="device.desktop ?`4`:`12`">
            <v-card
              class="mx-auto"
              max-width="300"
            >
              <v-toolbar
                :color="theme"
                dark
              >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title class="white--text">Per Status</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card
                class="mx-auto overflow-y-auto"
                height="300"
                max-width="300"
              >
                <v-col cols="12">
                  <per-status />
                </v-col>
              </v-card>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          :class="device.mobile ? `pa-1` : `pa-7`"
          v-show="false"
        >
          <v-col :cols="device.mobile ? `12` : `4`">
            <v-card
              :color="theme"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="subtitle-1 ">Pengajuan</v-card-title>

                  <v-card-subtitle>{{ jmlformasi }} Orang</v-card-subtitle>
                  <div></div>

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                    >
                      Lihat
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img src="http://siamanda.tangerangkab.go.id/images/people-man.png"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>

          <v-col :cols="device.mobile ? `12` : `4`">
            <v-card
              :color="theme"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="subtitle-1">BERKAS DITOLAK</v-card-title>

                  <v-card-subtitle>{{ jmlpelamar }} Orang</v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                    >
                      Lihat
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img src="http://siamanda.tangerangkab.go.id/images/people-man.png"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
          <v-col :cols="device.mobile ? `12` : `4`">
            <v-card
              :color="theme"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="subtitle-1">BERKAS DITERIMA</v-card-title>

                  <v-card-subtitle>{{ jmlpelamar }} Orang</v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                    >
                      Lihat
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img src="http://siamanda.tangerangkab.go.id/images/people-man.png"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pl-12 pr-12">
      <v-col class="stats-widget-v1">
        <v-card class="">
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Statistik Data Harian</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="subtitle-1">
              Statistik Data Pendaftaran Harian Per Jurusan
            </div>
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
              <template v-slot:item.id="{ value }">
                <v-tooltip
                  color="orange"
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
                        color="orange"
                        @click="editRecord(value)"
                      >create</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Data</span>
                </v-tooltip>
                <v-tooltip
                  color="red"
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
                        color="red"
                        @click="postConfirmDelete(value)"
                      >delete</v-icon>
                    </v-btn>
                  </template>

                  <span>Hapus Data</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pl-12 pr-12">
      <v-col class="stats-widget-v1">
        <v-card class="">
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Statistik Data Verifikasi Pendaftaran Per
              Jurusan</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="subtitle-1">
              Statistik Data Pendaftaran Harian Per Jurusan
            </div>
            <v-data-table
              :headers="headers2"
              :items="records2"
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
              <template v-slot:item.id="{ value }">
                <v-tooltip
                  color="orange"
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
                        color="orange"
                        @click="editRecord(value)"
                      >create</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Data</span>
                </v-tooltip>
                <v-tooltip
                  color="red"
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
                        color="red"
                        @click="postConfirmDelete(value)"
                      >delete</v-icon>
                    </v-btn>
                  </template>

                  <span>Hapus Data</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pl-12 pr-12 ">
      <v-col class="stats-widget-v1">
        <v-card class="">
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Statistik Data Per Jurusan Per Pilihan</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <div class="subtitle-1">
              Statistik Data Pendaftaran Harian Per Jurusan Per Pilihan
            </div>
            <v-data-table
              :headers="headers3"
              :items="records3"
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
              <template v-slot:item.id="{ value }">
                <v-tooltip
                  color="orange"
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
                        color="orange"
                        @click="editRecord(value)"
                      >create</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit Data</span>
                </v-tooltip>
                <v-tooltip
                  color="red"
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
                        color="red"
                        @click="postConfirmDelete(value)"
                      >delete</v-icon>
                    </v-btn>
                  </template>

                  <span>Hapus Data</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pa-1">
      <v-col class="stats-widget-v2">
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Pengaduan</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card
            class="mx-auto overflow-y-auto"
            height="300"
            max-width="500"
          >
            <v-list three-line>
              <v-list-item-group
                active-class="blue--text"
                multiple
              >
                <template v-for="(item, index) in pelamars">
                  <v-list-item :key="item.title">
                    <template v-slot:default="{ active }">
                      <v-list-item-avatar>
                        <v-img :src="item.foto"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          class="
                            text-uppercase text-subtitle-2
                            font-weight-bold
                          "
                          v-text="item.name"
                        ></v-list-item-title>
                        <v-list-item-title
                          class="text-uppercase text-subtitle-2 grey--text"
                          v-text="item.opd"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="grey--text"
                          v-text="item.jabatan"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle v-text="item.jam"></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-chip
                          small
                          :color="
                            item.status == 'PENGAJUAN'
                              ? `grey`
                              : item.status == 'PERBAIKAN'
                              ? `orange`
                              : item.status == 'TERVERIFIKASI'
                              ? `green`
                              : `red`
                          "
                          :disabled="!item.status"
                          class="white--text"
                        >{{ item.status }}</v-chip>
                      </v-list-item-action>
                    </template>
                  </v-list-item>

                  <v-divider
                    v-if="index < pelamars.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-col>

      <v-col class="">
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Pesan</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card
            class="mx-auto overflow-y-auto"
            height="300"
            max-width="500"
          >
            <v-list three-line>
              <template v-for="(item, index) in pesans">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.dari"
                      class="font-weight-bold text-sm-subtitle-2 text-uppercase"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="item.title"
                      class="black--text"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="item.body"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
      -->
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

import PerJenisKelamin from "../pages/chart/JenisKelamin.vue";
import PerJurusan from "../pages/chart/Jurusan.vue";
import PerStatus from "../pages/chart/Status.vue";
export default {
  name: "Sekolah",

  components: {
    PerJenisKelamin,
    PerJurusan,
    PerStatus,
  },

  data: () => ({
    num: 1,
    datacollection: null,
    chartData: {
      Books: 24,
      Magazine: 30,
      Newspapers: 10,
    },

    jmlformasi: 0,
    jmlpelamar: 0,
    pelamars: [],
    pesans: [],

    search: null,
    jmlpegawai: 25,

    selected: [2],

    headers: [],

    headers2: [
      { text: "#", value: "num", width: 50, align: "right" },
      {
        text: "PROGRAM KEAHLIAN",
        align: "start",
        sortable: false,
        value: "jurusan",
      },
      { text: "LAKI-LAKI", value: "jmll", width: 150, align: "center" },
      { text: "PEREMPUAN", value: "jmlp", width: 150, align: "center" },
      {
        text: "BELUM TERVERIFIKASI",
        value: "jmlbelum",
        width: 200,
        align: "center",
      },
      {
        text: "SUDAH TERVERIFIKASI",
        value: "jmlsudah",
        width: 200,
        align: "center",
      },
    ],

    headers3: [
      { text: "#", value: "num" },
      {
        text: "PROGRAM KEAHLIAN",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "PILIHAN I", value: "jmlpil1" },
      { text: "PILIHAN II", value: "jmlpil2" },
    ],

    records: [],

    records2: [],

    records3: [],
  }),
  computed: {
    ...mapState(["theme", "http", "device", "loading", "event"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/dashboard",
    });
    this.fetchDashboard();
    this.fetchPesan();
    this.fetchPerHari();
    this.fethDataVerifikasi();
    this.fethDataPerjurusanPerPilihan();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
    ]),

    fetchDashboard: async function () {
      let {
        data: { jmlformasi, jmlpelamar, pelamars },
      } = await this.http.get("api/dashboard-index");

      this.jmlformasi = jmlformasi;
      this.jmlpelamar = jmlpelamar;
      this.pelamars = pelamars;
    },

    fetchPesan: async function () {
      let {
        data: { pesans },
      } = await this.http.get("api/dashboard-pesan");

      this.pesans = pesans;
    },

    fetchPerHari: async function () {
      let {
        data: { headers, records },
      } = await this.http.get("api/dashboard-perhari");

      this.headers = headers;
      this.records = records;
    },

    fethDataVerifikasi: async function () {
      let {
        data: { data },
      } = await this.http.get("api/dashboard-verifikasi");

      this.records2 = data;
    },

    fethDataPerjurusanPerPilihan: async function () {
      let {
        data: { datas },
      } = await this.http.get("api/dashboard-perjurusan-per-pilihan");

      this.records3 = datas;
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
