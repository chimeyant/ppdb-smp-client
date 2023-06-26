<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">local_library</v-icon>
      <v-subheader class="text-h6">
        <h4>JADWAL PESERTA UJIAN</h4>
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
          <v-card-title
            :class="`flex flex-row-reverse ` + theme + ` lighten-1`"
          >
            <v-tooltip :color="theme + ` draken-4`" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="postSendPublicMessage"
                    >mail</v-icon
                  >
                </v-btn>
              </template>
              <span>KIRIM PESAN MASAL</span>
            </v-tooltip>

            <v-tooltip :color="theme + ` draken-4`" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="postConfirmDialogReset"
                    >published_with_changes</v-icon
                  >
                </v-btn>
              </template>
              <span>RESET JADWAL UJIAN</span>
            </v-tooltip>

            <v-tooltip :color="theme + ` draken-4`" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="postGenerate"
                    >low_priority</v-icon
                  >
                </v-btn>
              </template>
              <span>GENERATE JADWAL UJIAN</span>
            </v-tooltip>

            <v-tooltip :color="theme" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="fetchRecords">refresh</v-icon>
                </v-btn>
              </template>
              <span>REFRESH</span>
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

            <template v-slot:item.download="{ value }">
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green" @click="postDownload(value)"
                      >cloud_download</v-icon
                    >
                  </v-btn>
                </template>

                <span>Hapus Data</span>
              </v-tooltip>
            </template>

            <template v-slot:item.status="{ value }">
              <v-chip small :color="value ? `green` : `red`">{{
                value ? "Wajib" : "Opsional"
              }}</v-chip>
            </template>

            <template v-slot:item.id="{ value }">
              <v-tooltip color="orange" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon
                      color="orange"
                      @click="postSendPrivateMessage(value)"
                      >mail</v-icon
                    >
                  </v-btn>
                </template>
                <span>Kirim Pesan Pribadi</span>
              </v-tooltip>
              <v-tooltip color="red" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="red" @click="postDeleteRecord(value)"
                      >published_with_changes</v-icon
                    >
                  </v-btn>
                </template>

                <span>Reset Ujian</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog.reset" persistent max-width="300px">
      <v-card>
        <v-card-title class="headline red white--text" light
          ><v-icon color="white" class="pr-3">report_problem</v-icon>
          <span>Konfirmasi</span></v-card-title
        >
        <v-card-text>
          <p class="pt-5">
            Apakah anda yakin akan melakukan reset jadwal ujian ...?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="theme" text @click="dialog.reset = false">Tidak</v-btn>
          <v-btn color="red" text @click="postReset">Ya, Saya Yakin</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num" },
      { text: "NO. REG", value: "noreg" },
      { text: "NAMA", value: "nama" },
      { text: "JURUSAN", value: "jurusan" },
      { text: "TANGGAL", value: "tanggal" },
      { text: "SESI", value: "sesi" },
      { text: "PESAN", value: "status_pesan" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,
    tanggal: null,
    jadwal_ujian_sesi_id: null,

    sesis: [],

    records: [],
    record: {},
    loading: {
      table: false,
    },
    dialog: {
      reset: false,
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
          "api/jadwal-ujian-peserta/" +
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
        this.setLoading({
          dialog: true,
          text: "Mohon menunggu sedang membuat jadwal...",
        });
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
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },
    postConfirmDialogReset: function () {
      this.dialog.reset = true;
    },
    postReset: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Mohon Menunggu, sedang menghapus jadwal",
        });
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
      } finally {
        this.setLoading({
          dialog: false,
          message: "",
        });
      }
    },
    postSendPublicMessage: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Harap menunggu proses kirim pesan",
        });
        let {
          data: { status, message },
        } = await this.http.post("api/jadwal-ujian-peserta-public-pesan", {
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
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
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
        } = await this.http.post("api/jadwal-ujian-peserta-private-pesan", {
          id: val,
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
  },
};
</script>
