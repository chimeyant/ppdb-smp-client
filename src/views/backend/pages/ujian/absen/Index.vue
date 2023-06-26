<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme">local_library</v-icon>
      <v-subheader class="text-h6">
        <h4>ABSEN PESERTA UJIAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Jadwal Pesert Ujian Yang Tersedia Yang Tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title :class="`flex flex-row-reverse ` + theme + ` lighten-1`">
            <v-tooltip
              :color="theme"
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
                    @click="fetchRecords"
                  >refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
            </v-tooltip>
            <v-tooltip
              :color="theme"
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
                    @click="dialog.jadwalsusulan = true"
                  >published_with_changes</v-icon>
                </v-btn>
              </template>
              <span>Buat Jadwal Ujian Susulan</span>
            </v-tooltip>
            <v-tooltip
              :color="theme"
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
                    @click="downloadExcel"
                  >mdi-file-excel</v-icon>
                </v-btn>
              </template>
              <span>Export Data Excel Absensi Ujian</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              :color="theme"
            ></v-text-field>
          </v-card-title>

          <v-row class="pt-5 pl-3 pr-5">
            <v-col cols="3">
              <v-text-field
                label="Tanggal"
                :color="theme"
                dense
                outlined
                v-model="tanggal"
                type="date"
                @change="fetchRecords"
              ></v-text-field>
            </v-col>

            &nbsp;

            <v-col cols="3">
              <v-select
                label="Sesi"
                :color="theme"
                dense
                outlined
                v-model="jadwal_ujian_sesi_id"
                :items="sesis"
                @change="fetchRecords"
              ></v-select>
            </v-col>
          </v-row>

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
              <v-tooltip
                color="green"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    text
                    small
                    icon
                    v-on="on"
                  >
                    <v-chip
                      small
                      :color="
                        value == 'SELESAI'
                          ? `green`
                          : value == `SEDANG MENGERJAKAN`
                          ? `yellow`
                          : `grey`
                      "
                    >{{
                        value == "SELESAI"
                          ? `SL`
                          : value == "SEDANG MENGERJAKAN"
                          ? `SM`
                          : "BH"
                      }}</v-chip>
                  </v-btn>
                </template>

                <span>STATUS</span>
              </v-tooltip>
            </template>

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
                      @click="postSendPrivateMessage(value)"
                    >mail</v-icon>
                  </v-btn>
                </template>
                <span>Kirim Pesan Pribadi</span>
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
                      @click="postResetUjian(value)"
                    >published_with_changes</v-icon>
                  </v-btn>
                </template>

                <span>Reset Ujian</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog.reset"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-title
          class="headline red white--text"
          light
        >
          <v-icon
            color="white"
            class="pr-3"
          >report_problem</v-icon>
          <span>Konfirmasi</span>
        </v-card-title>
        <v-card-text>
          <p class="pt-5">
            Apakah anda yakin akan melakukan reset jadwal ujian ...?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme"
            text
            @click="dialog.reset = false"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="postReset"
          >Ya, Saya Yakin</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog.jadwalsusulan"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-title
          class="headline blue white--text"
          light
        >
          <v-icon
            color="white"
            class="pr-3"
          >mdi-clock-time-nine-outline</v-icon>
          <span>Ujian Susulan</span>
        </v-card-title>
        <v-card-text>
          <v-row class="pt-10">

            <v-col cols="12">
              <v-text-field
                label="Tanggal Susulan"
                outlined
                dense
                hide-details
                type="date"
                v-model="tanggal_susulan"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Jam Mulai"
                :color="theme"
                type="time"
                hide-details="device.desktop"
                autocomplete="off"
                v-model="jam_mulai"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Jam Selesai"
                :color="theme"
                type="time"
                hide-details="device.desktop"
                autocomplete="off"
                v-model="jam_selesai"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme"
            text
            @click="dialog.jadwalsusulan = false"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="postSusulan"
          >Ya, Saya Yakin</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import XLSX from "xlsx";
export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num" },
      { text: "NO. REG", value: "noreg" },
      { text: "NAMA", value: "nama" },
      { text: "JURUSAN", value: "jurusan" },
      { text: "JAM MASUK", value: "jam_masuk" },
      { text: "JAM KELUAR", value: "jam_keluar" },
      { text: "NILAI", value: "nilai" },
      { text: "STATUS", value: "status" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,
    tanggal: null,
    jadwal_ujian_sesi_id: null,
    tanggal_susulan: null,
    jam_mulai: null,
    jam_selesai: null,

    sesis: [],

    records: [],
    record: {},
    loading: {
      table: false,
    },
    dialog: {
      reset: false,
      jadwalsusulan: false,
    },
  }),
  computed: {
    ...mapState(["theme", "http", "device", "event", "snackbar"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/jadwal-ujian-peserta",
    });

    this.fetchSesis();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "addNewRecord", "setLoading"]),
    fetchRecords: async function () {
      try {
        this.loading.table = true;
        let { data } = await this.http.get(
          "api/jadwal-ujian-absen/" +
            this.tanggal +
            "/" +
            this.jadwal_ujian_sesi_id
        );

        this.records = data;
      } catch (error) {
      } finally {
        this.loading.table = false;
      }
    },
    fetchSesis: async function () {
      try {
        let { data: data } = await this.http.post(
          "api/jadwal-ujian-sesi-combo"
        );

        this.sesis = data;
      } catch (error) {}
    },
    postGenerate: async function () {
      try {
        let {
          data: { status, message },
        } = await this.http.post("api/jadwal-ujian-peserta-generate", {
          tanggal: this.tanggal,
          jadwal_ujian_sesi_id: this.jadwal_ujian_sesi_id,
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
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps.., terjadi kesalahan " + error;
        this.snackbar.state = true;
      }
    },
    postConfirmDialogReset: function () {
      this.dialog.reset = true;
    },
    postReset: async function () {
      try {
        let {
          data: { status, message },
        } = await this.http.post("api/jadwal-ujian-peserta-reset", {
          tanggal: this.tanggal,
          jadwal_ujian_sesi_id: this.jadwal_ujian_sesi_id,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
        this.dialog.reset = false;

        return;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Ops..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      }
    },
    postSendPrivateMessage: async function (val) {
      try {
        this.setLoading({
          dialog: true,
          text: "Harap menunggu sedang mengirim pesan",
        });

        let {
          data: { status, message },
        } = await this.http.post(
          "api/jadwal-ujian-absen-send-private-message",
          {
            id: val,
          }
        );

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    postSusulan: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Harap menunggu sedang membuat jadwal susulan",
        });

        let {
          data: { status, message },
        } = await this.http.post("api/jadwal-ujian-susulan", {
          tanggal: this.tanggal,
          jadwal_ujian_sesi_id: this.jadwal_ujian_sesi_id,
          tanggal_susulan: this.tanggal_susulan,
          jam_mulai: this.jam_mulai,
          jam_selesai: this.jam_selesai,
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
        this.fetchRecords();
        this.dialog.jadwalsusulan = false;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    downloadExcel: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses Download Data",
        });
        let { data } = await this.http.post("api/download-data-absen", {
          tanggal: this.tanggal,
          jadwal_ujian_sesi_id: this.jadwal_ujian_sesi_id,
        });

        var dataxls = XLSX.utils.json_to_sheet(data);

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new(); // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, dataxls, "daftar perserta"); // sheetAName is name of Worksheet
        //XLSX.utils.book_append_sheet(wb, pokemonWS, "pokemons");

        // export Excel file
        XLSX.writeFile(wb, "data-absen.xlsx"); // name of the file is 'book.xlsx'
      } catch (error) {
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    postResetUjian: async function (val) {
      try {
        let {
          data: { status, message },
        } = await this.http.post("reset-ujian-private", { id: val });
        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      }
    },
  },
};
</script>
