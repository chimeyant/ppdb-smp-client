<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">volunteer_activism</v-icon>
      <v-subheader class="text-h6">
        <h4>DAFTAR PERMOHONAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Permohonan
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse purple lighten-1">
            <v-tooltip color="purple" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="addNewRecord"
                    >add_circle</v-icon
                  >
                </v-btn>
              </template>
              <span>Tambah Permohonan</span>
            </v-tooltip>
            <v-tooltip color="green" bottom>
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
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green" @click="editRecord(value)"
                      >send</v-icon
                    >
                  </v-btn>
                </template>

                <span>Ajukan Perbaikan</span>
              </v-tooltip>

              <v-tooltip color="red" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="red" @click="postDeleteRecord(value)"
                      >delete</v-icon
                    >
                  </v-btn>
                </template>

                <span>Hapus Permohonan</span>
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
          <v-toolbar :color="theme" dark>Formulir Permohonan</v-toolbar>
          <v-card-title class="justify-center">DATA FORMASI</v-card-title>
          <v-card-text>
            <v-col cols="12"></v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              v-show="!edit"
              @click="postAddNewRecord"
              >Kirim</v-btn
            >
            <v-btn
              outlined
              :color="theme"
              v-show="edit"
              @click="postUpdateRecord"
              >Upload</v-btn
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
      { text: "NO. REGISTRASI", value: "noreg" },
      { text: "NAMA JABATAN", value: "nama_jabatan" },

      { text: "SATUAN KERJA", value: "opd" },
      { text: "STATUS", value: "status" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,
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
      "auth",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/peserta/permohonan",
    });
    this.fetchRecords();
    this.fetchOpds();
    this.fetchPendidikans();
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

    addNewRecord: function() {
      this.$router.push({ name: "peserta-permohonan-create" });
    },
    postAddNewRecord: function() {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
      });
    },

    editRecord: function(val) {
      this.postEdit(val).then(() => {
        this.postUpdateRecord(this.record);
      });
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
        fileType: [".pdf"],
        query: {
          doctype: "permohonan",
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
    "record.jurusans": function() {
      this.fetchJurusans();
    },
  },
};
</script>
