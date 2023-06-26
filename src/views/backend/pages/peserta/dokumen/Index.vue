<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">cases</v-icon>
      <v-subheader class="text-h6">
        <h4>DOKUMEN PERSYARATAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Dokumen Persyaratan
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse purple lighten-1">
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
              <v-chip small :color="value ? `red` : `yellow`">{{
                value ? "Wajib" : "Opsional"
              }}</v-chip>
            </template>
            <template v-slot:item.id="{ value }">
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green" @click="editRecord(value)"
                      >cloud_upload</v-icon
                    >
                  </v-btn>
                </template>

                <span>Upload Dokumen</span>
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
          <v-toolbar :color="theme" dark>Upload Dokumen Persyaratan</v-toolbar>
          <v-card-title class="justify-center"
            >Dokumen {{ record.name }}</v-card-title
          >
          <v-card-text>
            <v-col cols="12">
              <v-text-field
                label="File PDF (Max: 2 MB)"
                append-outer-icon="attachment"
                v-model="path"
                :color="theme"
                @click:append-outer="uploadFile"
                outlined
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

      { text: "DOKUMEN", value: "name" },
      { text: "STATUS", value: "status" },
      { text: "OPSI", value: "id" },
      { text: "KETERANGAN", value: "keterangan" },
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
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/peserta/dokumen",
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

    editRecord: function(val) {
      this.postEdit(val);
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
