<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">volunteer_activism</v-icon>
      <v-subheader class="text-h6">
        <h4>PERMOHONAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Permohonan Yang Tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse purple lighten-1">
            <v-tooltip color="purple darken-4" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="fetchRecords">refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
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
            <template v-slot:item.id="{ value }"> </template>
            <template v-slot:item.status="{ value }">
              <v-chip
                small
                :color="
                  value == 'PENGAJUAN'
                    ? `grey`
                    : value == 'TERVERIFIKASI'
                    ? `green`
                    : value == 'PERBAIKAN'
                    ? `orange`
                    : `red`
                "
                >{{ value }}</v-chip
              >
            </template>
            <template v-slot:item.id="{ value }">
              <v-tooltip color="orange" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="orange" @click="openVerifikasi(value)"
                      >mdi-account-check</v-icon
                    >
                  </v-btn>
                </template>
                <span>Verifikasi Data</span>
              </v-tooltip>
              <v-tooltip color="red" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="red" @click="postConfirmDelete(value)"
                      >delete</v-icon
                    >
                  </v-btn>
                </template>

                <span>Hapus Data</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar :color="theme" dark>Formulir Lowongan Formasi</v-toolbar>
          <v-card-title class="justify-center">DATA FORMASI</v-card-title>
          <v-card-text>
            <v-col cols="12">
              <v-select
                label="OPD"
                :color="theme"
                v-model="record.opd_id"
                :hide-details="device.desktop"
                dense
                outlined
                :items="opds"
                @change="fetchUnkers"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Unit Kerja"
                :color="theme"
                v-model="record.unit_kerja_id"
                :hide-details="device.desktop"
                dense
                outlined
                :items="unkers"
                @change="fetchNjab"
              ></v-select>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Jenis Jabatan"
                :color="theme"
                v-model="record.jenis_jabatan"
                :hide-details="device.desktop"
                dense
                outlined
                :items="jenisjabatans"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Nama Jabatan"
                v-model="record.nama_jabatan"
                dense
              ></v-text-field>
            </v-col>

            <v-col col="12">
              <v-textarea
                label="Keterangan"
                :color="theme"
                v-model="record.keterangan"
                dense
                :hide-details="device.desktop"
                outlined
                rows="2"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-select
                label="Pendidikan Terkahir"
                :color="theme"
                v-model="record.pendidikan_id"
                :hide-details="device.desktop"
                dense
                outlined
                :items="pendidikans"
                @change="fetchJurusans"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Jurusan"
                :color="theme"
                v-model="piljurusan"
                :hide-details="device.desktop"
                dense
                outlined
                :items="jurusans"
                multiple
              ></v-autocomplete>
            </v-col>

            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Jumlah Formasi"
                v-model="record.jumlah"
                dense
                type="number"
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Tanggal  Mulai"
                v-model="record.tanggal_mulai"
                type="date"
                dense
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Tanggal  Selesai"
                v-model="record.tanggal_selesai"
                type="date"
                dense
              ></v-text-field>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              v-show="!edit"
              @click="postAddNewRecord"
              >Tambah</v-btn
            >
            <v-btn
              outlined
              :color="theme"
              v-show="edit"
              @click="postUpdateRecord"
              >Ubah</v-btn
            >
            <v-btn outlined color="grey" @click="add = false">Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
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

      { text: "NAMA", value: "name" },
      { text: "FORMASI", value: "nama_jabatan" },
      { text: "OPD", value: "opd" },
      { text: "STATUS", value: "status" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,

    opds: [],
    unkers: [],
    pendidikans: [],
    jurusans: [],
    piljurusan: [],

    jenisjabatans: [
      { text: "Fungsional", value: "fungsional" },
      { text: "Pelaksana", value: "pelaksana" },
    ],
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/permohonan",
    });
    this.fetchRecords();
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
      "assignFileBrowse",
      "setRecord",
    ]),
    openVerifikasi: function(val) {
      this.$router.push({ name: "lowongan-verifikasi", params: { id: val } });
    },
    addNewRecord: function() {
      this.setRecord({});
      this.add = true;
      this.edit = false;
    },
    postAddNewRecord: function() {
      this.record.jurusans = this.piljurusan;
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.piljurusan = [];
        this.add = false;
      });
    },
    editRecord: function(val) {
      this.postEdit(val);
      this.piljurusan = this.record.jurusans;
      this.add = true;
      this.edit = true;
    },

    postUpdateRecord: function() {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
        this.edit = false;
      });
    },

    postDeleteRecord: function(val) {
      this.postConfirmDelete(val);
    },

    uploadFile: function() {
      this.assignFileBrowse({
        fileType: [".docx"],
        query: {
          doctype: "peraturan",
        },
        callback: (response) => {
          setTimeout(() => {
            this.path = response.name;
            this.record.path = response.name;
          }, 500);
        },
      });
    },

    fetchOpds: async function() {
      let { data: data } = await this.http.post("api/opd-combo");
      this.opds = data;
    },

    fetchUnkers: async function() {
      let { data: data } = await this.http.post("api/unker-combo", this.record);

      this.unkers = data;
    },

    fetchNjab: async function() {
      let { data: data } = await this.http.post("api/njab", this.record);

      this.record.nama_jabatan = data;
    },

    fetchPendidikans: async function() {
      let { data: data } = await this.http.post("api/pendidikan-combo");
      this.pendidikans = data;
    },

    fetchJurusans: async function() {
      let { data: data } = await this.http.post("api/jurusan-combo", {
        pendidikan_id: this.record.pendidikan_id,
      });

      this.jurusans = data;
    },

    postDownload(val) {
      window.open(val, "__blank");
    },
  },

  watch: {
    "record.pendidikan_id": function() {
      this.fetchJurusans();
    },
    "record.opd_id": function() {
      this.fetchUnkers();
    },
    "record.unit_kerja_id": function() {
      this.fetchNjab();
    },
  },
};
</script>
