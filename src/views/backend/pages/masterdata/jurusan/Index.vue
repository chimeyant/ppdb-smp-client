<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">description</v-icon>
      <v-subheader class="text-h6">
        <h4>MANAJEMEN JURUSAN PENDIDIKAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Jurusan Pendidikan Yang Tersedia Yang Tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse purple lighten-1">
            <v-tooltip color="purple draken-4" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="addNewRecord"
                    >add_circle</v-icon
                  >
                </v-btn>
              </template>
              <span>Tambah Dokumen Persyaratan</span>
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
                    <v-icon color="orange" @click="editRecord(value)"
                      >create</v-icon
                    >
                  </v-btn>
                </template>
                <span>Edit Data</span>
              </v-tooltip>
              <v-tooltip color="red" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="red" @click="postDeleteRecord(value)"
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
          <v-toolbar :color="theme" dark
            >Formulir Dokumen Persyaratans</v-toolbar
          >
          <v-card-title class="justify-center">DATA DOKUMEN</v-card-title>
          <v-card-text>
            <v-col col="12">
              <v-select
                label="Pendidikan"
                v-model="record.pendidikan_id"
                :color="theme"
                hide-details
                outlined
                :items="pendidikans"
              ></v-select>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Jurusan"
                v-model="record.name"
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

      { text: "PENDIDIKAN", value: "pendidikan" },
      { text: "JURUSAN", value: "name" },

      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,

    pendidikans: [],
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
      dataUrl: "api/jurusan",
    });
    this.fetchRecords();
    this.fetchPendidikan();
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
      this.setRecord({});
      this.add = true;
      this.edit = false;
    },
    postAddNewRecord: function() {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
      });
    },
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

    postDeleteRecord: function(val) {
      this.postConfirmDelete(val);
    },

    fetchPendidikan: async function() {
      try {
        let { data: data } = await this.http.post("api/pendidikan-combo");
        this.pendidikans = data;
      } catch (error) {}
    },
  },
};
</script>
